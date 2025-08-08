"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Search, Filter, Star, Leaf, Flower, Package, Droplet, ShoppingCart, Eye} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useProducts } from "@/hooks/use-products"
import { useCategories } from "@/hooks/use-categories"
import { useCategory } from "@/contexts/category-context"
import { useLanguage } from "@/contexts/language-context"


export default function ProductsPage() {
  const { t, locale } = useLanguage()
  const { products, loading, error, searchProducts } = useProducts()
  const { categories } = useCategories()
  const [searchQuery, setSearchQuery] = useState("")

    const { selectedCategory, setSelectedCategory } = useCategory();


    const iconMapCategory = {
        leaf: Leaf,
        flower: Flower,
        package: Package,
        droplet: Droplet,
    };
  useEffect(() => {
    searchProducts(searchQuery || undefined, selectedCategory !== "all" ? selectedCategory : undefined)
  }, [searchQuery, selectedCategory])




  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.common.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <div className="text-center">
          <p className="text-xl mb-4">{t.common.error}</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 mb-4">{t.products.hero.badge}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.products.hero.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.products.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t.products.filters.search}
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t.products.filters.category} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.products.filters.allCategories}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {locale === "en" && category.name_en ? category.name_en : category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              {products.length} {t.products.filters.results}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t.common.none}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          {t.products.product.unavailable}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {product.certifications?.map((cert) => (
                        <Badge key={cert} className="bg-green-100 text-green-800 text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {locale === "en" && product.name_en ? product.name_en : product.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">{product.category}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (product?.rating || 5) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {locale === "en" && product.description_en ? product.description_en : product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">€{product.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        {product.stock > 0 ? (
                          <span className="text-green-600">{t.products.product.inStock}</span>
                        ) : (
                          <span className="text-red-600">{t.products.product.outOfStock}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!product.available}
                        className="flex-1 bg-transparent"
                        asChild
                      >
                        <Link href={`/products/${product.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t.products.product.seeDetails}
                        </Link>
                      </Button>
                      {/*<Button*/}
                      {/*  size="sm"*/}
                      {/*  disabled={!product.available || product.stock === 0}*/}
                      {/*  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"*/}
                      {/*>*/}
                      {/*  <ShoppingCart className="w-4 h-4 mr-2" />*/}
                      {/*  {product.available && product.stock > 0*/}
                      {/*    ? t.products.product.addToCart*/}
                      {/*    : t.products.product.notAvailable}*/}
                      {/*</Button>*/}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.products.categories.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.products.categories.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {categories.map((category) => {
                const IconCat = iconMapCategory[category?.icon?.toLowerCase()] || Leaf;
                return (
                  <Card
                      key={category.id}
                      className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleCategoryChange(category.name)}
                      asChild
                  >
                    <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                      <CardHeader>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconCat className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle className="text-lg">
                          {locale === "en" && category.name_en ? category.name_en : category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm">
                          {locale === "en" && category.description_en ? category.description_en : category.description}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
