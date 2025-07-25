import {
  supabase,
  type Product,
  type ContactMessage,
  type SiteContent,
  type Category,
  type ContactInfo,
} from "./supabase"

// Fonctions pour les informations de contact
export async function getContactInfo() {
  const { data, error } = await supabase.from("contact_info").select("*").order("key")

  if (error) {
    if (error.code === "42P01") {
      console.warn("[getContactInfo] La table 'contact_info' n'existe pas encore. Retour d'une liste vide.")
      return [] as ContactInfo[]
    }
    throw error
  }

  return data as ContactInfo[]
}

export async function updateContactInfo(key: string, value: string) {
  const { data, error } = await supabase.from("contact_info").upsert([{ key, value }]).select().single()
  if (error) throw error
  return data as ContactInfo
}

// Fonctions pour les catégories
export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    if (error.code === "42P01") {
      console.warn("[getCategories] La table 'categories' n'existe pas encore. Retour d'une liste vide.")
      return [] as Category[]
    }
    throw error
  }

  return data as Category[]
}

export async function createCategory(category: Omit<Category, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("categories").insert([category]).select().single()
  if (error) throw error
  return data as Category
}

export async function updateCategory(id: string, updates: Partial<Category>) {
  const { data, error } = await supabase.from("categories").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data as Category
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id)
  if (error) throw error
}

// Fonctions pour les produits
export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    if (error.code === "42P01") {
      console.warn("[getProducts] La table 'products' n'existe pas encore. Retour d'une liste vide.")
      return [] as Product[]
    }
    throw error
  }

  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
  if (error) throw error
  return data as Product
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  // Si category_id est fourni, récupérer les noms de catégorie
  if (product.category_id) {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("name, name_en")
      .eq("id", product.category_id)
      .single()

    if (categoryData) {
      product.category = categoryData.name
      product.category_en = categoryData.name_en
    }
  }

  const { data, error } = await supabase.from("products").insert([product]).select().single()
  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  // Si category_id est fourni, récupérer les noms de catégorie
  if (updates.category_id) {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("name, name_en")
      .eq("id", updates.category_id)
      .single()

    if (categoryData) {
      updates.category = categoryData.name
      updates.category_en = categoryData.name_en
    }
  }

  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) throw error
}

// Fonctions pour les messages de contact
export async function createContactMessage(message: Omit<ContactMessage, "id" | "created_at" | "status">) {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([{ ...message, status: "new" }])
    .select()
    .single()
  if (error) throw error
  return data as ContactMessage
}

export async function getContactMessages() {
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

  if (error) {
    if (error.code === "42P01") {
      console.warn("[getContactMessages] La table 'contact_messages' n'existe pas encore. Retour d'une liste vide.")
      return [] as ContactMessage[]
    }
    throw error
  }

  return data as ContactMessage[]
}

export async function getContactMessageById(id: string) {
  const { data, error } = await supabase.from("contact_messages").select("*").eq("id", id).single()
  if (error) throw error
  return data as ContactMessage
}

export async function updateContactMessageStatus(id: string, status: ContactMessage["status"]) {
  const { data, error } = await supabase.from("contact_messages").update({ status }).eq("id", id).select().single()
  if (error) throw error
  return data as ContactMessage
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from("contact_messages").delete().eq("id", id)
  if (error) throw error
}

// Fonctions pour le contenu du site
export async function getSiteContent() {
  const { data, error } = await supabase.from("site_content").select("*")

  if (error) {
    if (error.code === "42P01") {
      console.warn("[getSiteContent] La table 'site_content' n'existe pas encore. Retour d'une liste vide.")
      return [] as SiteContent[]
    }
    throw error
  }

  return data as SiteContent[]
}

export async function updateSiteContent(key: string, value_fr: string, value_en: string) {
  const { data, error } = await supabase.from("site_content").upsert([{ key, value_fr, value_en }]).select().single()
  if (error) throw error
  return data as SiteContent
}

// Fonctions de recherche et filtrage
export async function searchProducts(query?: string, category?: string, available?: boolean) {
  let queryBuilder = supabase.from("products").select("*")

  if (query) {
    queryBuilder = queryBuilder.or(
      `name.ilike.%${query}%,description.ilike.%${query}%,name_en.ilike.%${query}%,description_en.ilike.%${query}%`,
    )
  }

  if (category && category !== "all") {
    queryBuilder = queryBuilder.or(`category.eq.${category},category_en.eq.${category}`)
  }

  if (available !== undefined) {
    queryBuilder = queryBuilder.eq("available", available)
  }

  const { data, error } = await queryBuilder.order("created_at", { ascending: false })

  if (error) {
    if (error.code === "42P01") {
      console.warn("[searchProducts] La table 'products' n'existe pas encore. Retour d'une liste vide.")
      return [] as Product[]
    }
    throw error
  }

  return data as Product[]
}

// Statistiques
export async function getProductStats() {
  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    if (error.code === "42P01") {
      return {
        totalProducts: 0,
        availableProducts: 0,
        totalStock: 0,
        lowStockProducts: 0,
      }
    }
    throw error
  }

  const totalProducts = products.length
  const availableProducts = products.filter((p) => p.available).length
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const lowStockProducts = products.filter((p) => (p.stock || 0) < 10).length

  return {
    totalProducts,
    availableProducts,
    totalStock,
    lowStockProducts,
  }
}

export async function getMessageStats() {
  const { data: messages, error } = await supabase.from("contact_messages").select("*")

  if (error) {
    if (error.code === "42P01") {
      return {
        totalMessages: 0,
        newMessages: 0,
        readMessages: 0,
        repliedMessages: 0,
      }
    }
    throw error
  }

  const totalMessages = messages.length
  const newMessages = messages.filter((m) => m.status === "new").length
  const readMessages = messages.filter((m) => m.status === "read").length
  const repliedMessages = messages.filter((m) => m.status === "replied").length

  return {
    totalMessages,
    newMessages,
    readMessages,
    repliedMessages,
  }
}
