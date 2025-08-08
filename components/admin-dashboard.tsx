"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog,  AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"

import {
  LogOut,
  CheckCircle,
  AlertCircle,
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  BarChart3,
  TrendingUp,
  FolderOpen,
  ImageIcon,
  Upload,
  X,
    Signature
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useProducts } from "@/hooks/use-products"
import { useCategories } from "@/hooks/use-categories"
import { useMessages } from "@/hooks/use-messages"
import { useContactInfo } from "@/hooks/use-contact-info"
import { logout } from "@/lib/auth"

export default function AdminDashboard() {
  const { t } = useLanguage()
  const { products, loading: productsLoading, createProduct, updateProduct, deleteProduct } = useProducts()
  const { categories, loading: categoriesLoading, createCategory, updateCategory, deleteCategory } = useCategories()
  const { messages, loading: messagesLoading, updateMessageStatus, deleteMessage } = useMessages()
  const { contactInfo, loading: contactInfoLoading,fetchContactInfo, updateContactInfo, getContactValue } = useContactInfo()

  const [stats, setStats] = useState<any>(null)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)

  const [viewingMessage, setViewingMessage] = useState<any>(null)
  const [contactData, setContactData] = useState({
    phone: "",
    email: "",
    address: "",
    facebook: "",
    linkedin: "",
  })
  const [newProduct, setNewProduct] = useState({
    name: "",
    name_en: "",
    category_id: "",
    category: "",
    category_en: "",
    price: "",
    stock: "",
    description: "",
    description_en: "",
    available: true,
    certifications: "",
    image_url: "",
  })
  const [newCategory, setNewCategory] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    icon: "leaf",
  })
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [imageUploadType, setImageUploadType] = useState<"url" | "upload">("url")
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [openMessageDetailDialog, setOpenMessageDetailDialog] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [isDeletingMessage, setIsDeletingMessage] = useState(false)


  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [isDeletingCategory, setIsDeletingCategory] = useState(false)
  const [isConfirmDialogDeletingCategory, setIsConfirmDialogDeletingCategory] = useState(false);



  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const [isConfirmDialogDeletingProduct, setIsConfirmDialogDeletingProduct] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

  const initialContactInfo = () => {
        setContactData({
            phone: getContactValue("phone"),
            email: getContactValue("email"),
            address: getContactValue("address"),
            facebook: getContactValue("facebook"),
            linkedin: getContactValue("linkedin"),
        })
    }

    useEffect(() => {
    fetchStats()
      fetchContactInfo()
  }, [])


    useEffect(() => {
        if (contactInfo) {
            initialContactInfo();
        }
    }, [contactInfo])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return null

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      setAlert({ type: "error", message: "Type de fichier non supporté. Utilisez JPG, PNG ou WebP." })
      return null
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setAlert({ type: "error", message: "Fichier trop volumineux. Taille maximum: 5MB." })
      return null
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement")
      }

      const data = await response.json()
      return data.imageUrl // Utiliser imageUrl au lieu de url
    } catch (error) {
      setAlert({ type: "error", message: t.admin.addProduct.uploadError })
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const imageUrl = await handleFileUpload(files[0])
      if (imageUrl) {
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image_url: imageUrl })
        } else {
          setNewProduct({ ...newProduct, image_url: imageUrl })
        }
      }
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const imageUrl = await handleFileUpload(files[0])
      if (imageUrl) {
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image_url: imageUrl })
        } else {
          setNewProduct({ ...newProduct, image_url: imageUrl })
        }
      }
    }
  }

  const handleAddProduct = async () => {
    setIsAdding(true)
        try {
      const certifications = newProduct.certifications
        ? newProduct.certifications
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : []

      // Trouver la catégorie sélectionnée
      const selectedCategory = categories.find((c) => c.id === newProduct.category_id)

      const productData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock) || 0,
        certifications,
        category: selectedCategory?.name || newProduct.category,
        category_en: selectedCategory?.name_en || newProduct.category_en,
      }

      await createProduct(productData)
      setNewProduct({
        name: "",
        name_en: "",
        category_id: "",
        category: "",
        category_en: "",
        price: "",
        stock: "",
        description: "",
        description_en: "",
        available: true,
        certifications: "",
        image_url: "",
      })
      setAlert({ type: "success", message: t.admin.addProduct.success })
      fetchStats()
    } catch (error) {
      setAlert({ type: "error", message: t.admin.addProduct.error })
    } finally {
        setIsAdding(false)
        }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return
    setIsUpdating(true)
    try {
      const certifications =
        typeof editingProduct.certifications === "string"
          ? editingProduct.certifications
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : editingProduct.certifications

      const selectedCategory = categories.find((c) => c.id === editingProduct.category_id)

      const updates = {
        ...editingProduct,
        price: Number.parseFloat(editingProduct.price),
        stock: Number.parseInt(editingProduct.stock) || 0,
        certifications,
        category: selectedCategory?.name || editingProduct.category,
        category_en: selectedCategory?.name_en || editingProduct.category_en,
      }

      await updateProduct(editingProduct.id, updates)
      setEditingProduct(null)
      setAlert({ type: "success", message: t.admin.addProduct.updateSuccess })
      fetchStats()
    } catch (error) {
      setAlert({ type: "error", message: t.admin.addProduct.updateError })
    } finally {
        setIsUpdating(false)
    }
  }

  const handleDeleteProduct =  (id: string) => {
    setSelectedProductId(id);
    setIsConfirmDialogDeletingProduct(true);
  }


  const confirmDeleteProduct = async () => {
    if (!selectedProductId) return
    setIsDeletingProduct(true)

    try {
        await deleteProduct(selectedProductId)
        setAlert({ type: "success", message: "Produit supprimé avec succès !" })
        fetchStats()
      } catch (error) {
        setAlert({ type: "error", message: "Erreur lors de la suppression" })
      }finally {
        setIsDeletingProduct(false)
        setIsConfirmDialogDeletingProduct(false)
        setSelectedProductId(null)
    }
  }

  const handleAddCategory = async () => {
    setIsAdding(true)
    try {
      await createCategory(newCategory)
      setNewCategory({
        name: "",
        name_en: "",
        description: "",
        description_en: "",
        icon: "leaf",
      })
      setAlert({ type: "success", message: t.admin.categories.success.added })
    } catch (error) {
      setAlert({ type: "error", message: t.admin.categories.error.add })
    } finally {
      setIsAddCategoryDialogOpen(false);
      setIsAdding(false)


    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return
    setIsUpdating(true)
    try {
      await updateCategory(editingCategory.id, editingCategory)
      setEditingCategory(null)
      setAlert({ type: "success", message: t.admin.categories.success.updated })
    } catch (error) {
      setAlert({ type: "error", message: t.admin.categories.error.update })
    } finally {
        setIsUpdating(false)
    }
  }

  const handleDeleteCategory = (id : string)=> {
    setSelectedCategoryId(id);
    setIsConfirmDialogDeletingCategory(true);
  }

  const confirmDeleteCategory = async () => {
    if (!selectedCategoryId) return
      setIsDeletingCategory(true)

      try {
        await deleteCategory(selectedCategoryId)
        setAlert({ type: "success", message: t.admin.categories.success.deleted })
      } catch (error) {
        setAlert({ type: "error", message: t.admin.categories.error.delete })
      } finally {
        setIsDeletingCategory(false)
        setIsConfirmDialogDeletingCategory(false)
      }

  }

  const handleLogout = async () => {
    await logout()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: "default" as const, label: t.admin.messages.status.new },
      read: { variant: "secondary" as const, label: t.admin.messages.status.read },
      replied: { variant: "outline" as const, label: t.admin.messages.status.replied },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const ImageUploadComponent = ({ isEditing = false }) => (
    <div>
      <Label>{t.admin.addProduct.form.image}</Label>
      <div className="space-y-3">
        <div className="flex gap-4">
          <Button
            type="button"
            variant={imageUploadType === "url" ? "default" : "outline"}
            onClick={() => setImageUploadType("url")}
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            URL
          </Button>
          <Button
            type="button"
            variant={imageUploadType === "upload" ? "default" : "outline"}
            onClick={() => setImageUploadType("upload")}
            size="sm"
          >
            <Upload className="w-4 h-4 mr-2" />
            {t.admin.addProduct.form.uploadFromDevice}
          </Button>
        </div>
        {imageUploadType === "url" ? (
          <Input
            placeholder={t.admin.addProduct.form.placeholders.imageUrl}
            value={isEditing ? editingProduct?.image_url || "" : newProduct.image_url}
            onChange={(e) => {
              if (isEditing) {
                setEditingProduct({ ...editingProduct, image_url: e.target.value })
              } else {
                setNewProduct({ ...newProduct, image_url: e.target.value })
              }
            }}
          />
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              dragOver ? "border-green-500 bg-green-50" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-2"></div>
                <p className="text-gray-500">{t.admin.addProduct.form.uploading}</p>
              </div>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">{t.admin.addProduct.form.dragDrop}</p>
                <p className="text-sm text-gray-400">{t.admin.addProduct.form.supportedFormats}</p>
              </>
            )}
          </div>
        )}
        {/* Prévisualisation de l'image */}
        {(isEditing ? editingProduct?.image_url : newProduct.image_url) && (
          <div className="relative">
            <img
              src={isEditing ? editingProduct?.image_url : newProduct.image_url}
              alt="Prévisualisation"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0"
              onClick={() => {
                if (isEditing) {
                  setEditingProduct({ ...editingProduct, image_url: "" })
                } else {
                  setNewProduct({ ...newProduct, image_url: "" })
                }
              }}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )



  const handleDeleteMessage = (id: string) => {
    setSelectedMessageId(id)
    setOpenMessageDetailDialog(true)
  }

  const confirmDeleteMessage = async () => {
    if (!selectedMessageId) return
    setIsDeletingMessage(true)
    try {
      await deleteMessage(selectedMessageId)
      setAlert({ type: "success", message: t.admin.messages.actions.deleted })
      fetchStats()
    } catch (error) {
      setAlert({ type: "error", message: t.admin.messages.actions.deleteError })
    } finally {
      setIsDeletingMessage(false)
      setOpenMessageDetailDialog(false)
      setSelectedMessageId(null)

    }
  }



    const handleUpdateContactInfo = async () => {
        setIsUpdating(true)
        const updates = Object.entries(contactData).map(([key, value]) => ({
            key,
            value,
        }))
        try {
            await updateContactInfo(updates)
            setAlert({ type: "success", message: t.admin.contactInfo.success })

        } catch (error) {
            setAlert({ type: "error", message: t.admin.contactInfo.error })

        } finally {
            setIsUpdating(false)
        }
    }



    if (productsLoading || categoriesLoading || messagesLoading || contactInfoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.common.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.admin.dashboard.title}</h1>
            <p className="text-gray-600">{t.admin.dashboard.description}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            {t.admin.dashboard.logout}
          </Button>
        </div>

        {/* Alert */}
        {alert && (
          <Alert
            className={`mb-6 ${alert.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            {alert.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={alert.type === "success" ? "text-green-800" : "text-red-800"}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="flex w-max min-w-full space-x-2 px-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {t.admin.tabs.overview}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t.admin.tabs.analytics}
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                {t.admin.tabs.categories}
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                {t.admin.tabs.products}
              </TabsTrigger>
              <TabsTrigger value="add-product" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {t.admin.tabs.addProduct}
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t.admin.tabs.messages}
              </TabsTrigger>
              <TabsTrigger value="contact-info" className="flex items-center gap-2">
                <Signature className="w-4 h-4" />
                {t.admin.tabs.contactInfo}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.overview.title}</h2>
              <p className="text-gray-600 mb-6">{t.admin.overview.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.totalProducts}</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.products?.totalProducts || products.length}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.catalog}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.totalCategories}</CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.activeCategories}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.totalMessages}</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.messages?.totalMessages || messages.length}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.thisWeek}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.newMessages}</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.messages?.newMessages || messages.filter((m) => m.status === "new").length}
                  </div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.thisWeek}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.analytics.title}</h2>
              <p className="text-gray-600 mb-6">{t.admin.analytics.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.totalProducts}</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.catalog}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.availableProducts}</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.filter((p) => p.available).length}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.catalog}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.totalStock}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.units}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.admin.analytics.lowStock}</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.filter((p) => p.stock < 10).length}</div>
                  <p className="text-xs text-muted-foreground">{t.admin.analytics.catalog}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.categories.title}</h2>
                <p className="text-gray-600 mb-6">{t.admin.categories.description}</p>
              </div>
              <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.admin.categories.add}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.admin.categories.addNew}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cat-name">{t.admin.categories.name}</Label>
                      <Input
                        id="cat-name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder={t.admin.categories.placeholders.name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cat-name-en">{t.admin.categories.nameEn}</Label>
                      <Input
                        id="cat-name-en"
                        value={newCategory.name_en}
                        onChange={(e) => setNewCategory({ ...newCategory, name_en: e.target.value })}
                        placeholder={t.admin.categories.placeholders.nameEn}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cat-desc">{t.admin.categories.description}</Label>
                      <Textarea
                        id="cat-desc"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder={t.admin.categories.placeholders.description}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cat-desc-en">{t.admin.categories.descriptionEn}</Label>
                      <Textarea
                        id="cat-desc-en"
                        value={newCategory.description_en}
                        onChange={(e) => setNewCategory({ ...newCategory, description_en: e.target.value })}
                        placeholder={t.admin.categories.placeholders.descriptionEn}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cat-icon">{t.admin.categories.icon}</Label>
                      <Select
                        value={newCategory.icon}
                        onValueChange={(value) => setNewCategory({ ...newCategory, icon: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leaf">🌿 Leaf</SelectItem>
                          <SelectItem value="droplet">💧 Droplet</SelectItem>
                          <SelectItem value="flower">🌸 Flower</SelectItem>
                          <SelectItem value="package">📦 Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button disabled={isAdding} onClick={() =>{

                        handleAddCategory();

                      }}
                            className="w-full bg-green-600 hover:bg-green-700">
                      { isAdding ? t.admin.categories.actions.adding : t.admin.categories.actions.add}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.admin.categories.name}</TableHead>
                      <TableHead>{t.admin.categories.nameEn}</TableHead>
                      <TableHead>{t.admin.categories.description}</TableHead>
                      <TableHead>{t.admin.categories.icon}</TableHead>
                      <TableHead>{t.admin.products.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.name_en}</TableCell>
                        <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                        <TableCell>{category.icon}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingCategory(category)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.products.title}</h2>
              <p className="text-gray-600 mb-6">{t.admin.products.description}</p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.admin.products.table.image}</TableHead>
                      <TableHead>{t.admin.products.table.name}</TableHead>
                      <TableHead>{t.admin.products.table.category}</TableHead>
                      <TableHead>{t.admin.products.table.price}</TableHead>
                      <TableHead>{t.admin.products.table.stock}</TableHead>
                      <TableHead>{t.admin.products.table.status}</TableHead>
                      <TableHead>{t.admin.products.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.image_url ? (
                              <img
                                src={product.image_url || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>€{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={product.available ? "default" : "secondary"}>
                            {product.available ? t.admin.products.table.available : t.admin.products.table.unavailable}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Product Tab */}
          <TabsContent value="add-product" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.addProduct.title}</h2>
              <p className="text-gray-600 mb-6">{t.admin.addProduct.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">{t.admin.addProduct.form.name}</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name_en">{t.admin.addProduct.form.nameEn}</Label>
                    <Input
                      id="name_en"
                      value={newProduct.name_en}
                      onChange={(e) => setNewProduct({ ...newProduct, name_en: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.nameEn}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">{t.admin.addProduct.form.category}</Label>
                    <Select
                      value={newProduct.category_id}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.admin.addProduct.form.selectCategory} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">{t.admin.addProduct.form.price}</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.price}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">{t.admin.addProduct.form.stock}</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.stock}
                    />
                  </div>
                  <ImageUploadComponent />
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="description">{t.admin.addProduct.form.description}</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.description}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description_en">{t.admin.addProduct.form.descriptionEn}</Label>
                    <Textarea
                      id="description_en"
                      value={newProduct.description_en}
                      onChange={(e) => setNewProduct({ ...newProduct, description_en: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.descriptionEn}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="certifications">{t.admin.addProduct.form.certifications}</Label>
                    <Input
                      id="certifications"
                      value={newProduct.certifications}
                      onChange={(e) => setNewProduct({ ...newProduct, certifications: e.target.value })}
                      placeholder={t.admin.addProduct.form.placeholders.certifications}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="available"
                      checked={newProduct.available}
                      onCheckedChange={(checked) => setNewProduct({ ...newProduct, available: checked })}
                    />
                    <Label htmlFor="available">{t.admin.addProduct.form.available}</Label>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700" disabled={uploading || isAdding}>
                    <Plus className="w-4 h-4 mr-2" />
                    { isAdding ?  t.admin.addProduct.actions.adding :
                        t.admin.addProduct.actions.add}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setNewProduct({
                        name: "",
                        name_en: "",
                        category_id: "",
                        category: "",
                        category_en: "",
                        price: "",
                        stock: "",
                        description: "",
                        description_en: "",
                        available: true,
                        certifications: "",
                        image_url: "",
                      })
                    }
                  >
                    {t.admin.addProduct.actions.reset}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.messages.title}</h2>
              <p className="text-gray-600 mb-6">{t.admin.messages.description}</p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.admin.messages.table.name}</TableHead>
                      <TableHead>{t.admin.messages.table.email}</TableHead>
                      <TableHead>{t.admin.messages.table.subject}</TableHead>
                      <TableHead>{t.admin.messages.table.date}</TableHead>
                      <TableHead>{t.admin.messages.table.status}</TableHead>
                      <TableHead>{t.admin.messages.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                    {messages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">
                          {message.first_name} {message.last_name}
                        </TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{formatDate(message.created_at)}</TableCell>
                        <TableCell>{getStatusBadge(message.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => {
                              setViewingMessage(message)
                              updateMessageStatus(message.id, "read")}
                            }
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size={"sm"} variant={"outline"} className="text-red-600 hover:text-red-700" onClick={() => handleDeleteMessage(message.id)}>
                              <Trash2 className={"w-4 h-4"}/>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>




               {/* Contact Info Tab */}
        <TabsContent value="contact-info" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.contactInfo.title}</h2>
            <p className="text-gray-600 mb-6">{t.admin.contactInfo.description}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>{t.admin.contactInfo.phone}</Label>
                  <Input
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="+261 XX XX XXX XX"
                  />
                </div>
                <div>
                  <Label>{t.admin.contactInfo.email}</Label>
                  <Input
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="contact@bio-north.mg"
                  />
                </div>
                <div>
                  <Label>{t.admin.contactInfo.address}</Label>
                  <Textarea
                    value={contactData.address}
                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                    placeholder={"Andapa Region Sava"}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t.admin.contactInfo.facebook}</Label>
                  <Input
                    value={contactData.facebook}
                    onChange={(e) => setContactData({ ...contactData, facebook: e.target.value })}
                    placeholder=""
                  />
                </div>
                <div>
                  <Label>{t.admin.contactInfo.linkedin}</Label>
                  <Input
                    value={contactData.linkedin}
                    onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button disabled={isUpdating} onClick={handleUpdateContactInfo}
                        className="bg-green-600 hover:bg-green-700">
                    {isUpdating
                        ? t.admin.contactInfo.actions.updating
                        : t.admin.contactInfo.actions.update
                    }
                </Button>
                <Button variant="outline" onClick={initialContactInfo}>
                  {t.admin.contactInfo.actions.reset}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>

        {/* Edit Product Dialog */}
        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t.admin.addProduct.editTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t.admin.addProduct.form.name}</Label>
                    <Input
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>{t.admin.addProduct.form.nameEn}</Label>
                    <Input
                      value={editingProduct.name_en}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t.admin.addProduct.form.category}</Label>
                    <Select
                      value={editingProduct.category_id}
                      onValueChange={(value) => setEditingProduct({ ...editingProduct, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t.admin.addProduct.form.price}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t.admin.addProduct.form.stock}</Label>
                    <Input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    />
                  </div>
                  <ImageUploadComponent isEditing={true} />
                </div>
                <div>
                  <Label>{t.admin.addProduct.form.description}</Label>
                  <Textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t.admin.addProduct.form.descriptionEn}</Label>
                  <Textarea
                    value={editingProduct.description_en}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description_en: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t.admin.addProduct.form.certifications}</Label>
                  <Input
                    value={
                      Array.isArray(editingProduct.certifications)
                        ? editingProduct.certifications.join(", ")
                        : editingProduct.certifications
                    }
                    onChange={(e) => setEditingProduct({ ...editingProduct, certifications: e.target.value })}
                    placeholder={t.admin.addProduct.form.placeholders.certifications}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingProduct.available}
                    onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, available: checked })}
                  />
                  <Label>{t.admin.addProduct.form.available}</Label>
                </div>
                <div className="flex gap-4">
                   <Button variant="outline" onClick={() => setEditingProduct(null)}>
                    {t.admin.addProduct.actions.cancel}
                  </Button>
                  <Button
                    onClick={handleUpdateProduct}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={uploading || isUpdating}

                  >
                    { isUpdating ?
                        t.admin.addProduct.actions.updating
                        : t.admin.addProduct.actions.update}
                  </Button>


                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Category Dialog */}
        {editingCategory && (
          <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.admin.categories.actions.edit}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t.admin.categories.name}</Label>
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.admin.categories.nameEn}</Label>
                  <Input
                    value={editingCategory.name_en}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name_en: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.admin.categories.description}</Label>
                  <Textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.admin.categories.descriptionEn}</Label>
                  <Textarea
                    value={editingCategory.description_en}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description_en: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.admin.categories.icon}</Label>
                  <Select
                    value={editingCategory.icon}
                    onValueChange={(value) => setEditingCategory({ ...editingCategory, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leaf">🌿 Leaf</SelectItem>
                      <SelectItem value="droplet">💧 Droplet</SelectItem>
                      <SelectItem value="flower">🌸 Flower</SelectItem>
                      <SelectItem value="package">📦 Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4">
                  <Button disabled={isUpdating} onClick={handleUpdateCategory} className="bg-green-600 hover:bg-green-700">
                    { isUpdating
                        ? t.admin.categories.actions.updating
                    : t.admin.categories.actions.update
                    }
                  </Button>
                  <Button  variant="outline" onClick={() => setEditingCategory(null)}>
                    {t.admin.categories.actions.cancel}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* View Message Dialog */}
        {viewingMessage && (
          <Dialog open={!!viewingMessage} onOpenChange={() => setViewingMessage(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.admin.messages.messageDetails}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t.admin.messages.table.name}</Label>
                  <Input value={`${viewingMessage.first_name} ${viewingMessage.last_name}`} disabled />
                </div>
                <div>
                  <Label>{t.admin.messages.table.email}</Label>
                  <Input value={viewingMessage.email} disabled />
                </div>
                <div>
                  <Label>{t.admin.messages.table.subject}</Label>
                  <Input value={viewingMessage.subject} disabled />
                </div>
                <div>
                  <Label>{t.admin.messages.table.date}</Label>
                  <Input value={formatDate(viewingMessage.created_at)} disabled />
                </div>
                <div>
                  <Label>{t.admin.messages.content}</Label>
                  <Textarea value={viewingMessage.message} disabled rows={5} />
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setViewingMessage(null)} variant="outline">
                    {t.admin.messages.actions.close}
                  </Button>
                  <Button variant={"destructive"} onClick={() => {
                    handleDeleteMessage(viewingMessage.id);
                    setViewingMessage(null);

                  }}>

                    {t.admin.messages.actions.delete}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}



        {/* Delete Confirmation Dialog */}
          <AlertDialog open={openMessageDetailDialog} onOpenChange={setOpenMessageDetailDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                {t.admin.messages.actions.confirmDelete}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeletingMessage}>{t.admin.messages.actions.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteMessage} disabled={isDeletingMessage}>
                {isDeletingMessage ? t.admin.messages.actions.delete + "..." : t.admin.messages.actions.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        {/* Delete Category Confirmation Dialog */}

        <AlertDialog open={isConfirmDialogDeletingCategory} onOpenChange={setIsConfirmDialogDeletingCategory}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                {t.admin.categories.confirmDelete}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeletingCategory}>{t.admin.categories.actions.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteCategory} disabled={isDeletingCategory}>
                {isDeletingCategory ? t.admin.categories.actions.delete + "..." : t.admin.categories.actions.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

        </AlertDialog>


        {/* Delete Product Confirmation Dialog */}
        <AlertDialog open={isConfirmDialogDeletingProduct} onOpenChange={setIsConfirmDialogDeletingProduct}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                {t.admin.products.actions.confirmDelete}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeletingProduct}>{t.admin.products.actions.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteProduct} disabled={isDeletingProduct}>
                {isDeletingProduct ? t.admin.products.actions.delete + "..." : t.admin.products.actions.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>



      </div>
    </div>
  )
}
