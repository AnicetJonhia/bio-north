import { createClient } from "@supabase/supabase-js"


const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey)



// Types pour la base de données
export interface Product {
  id: string
  name: string
  name_en: string
  description: string
  description_en: string
  category_id?: string
  category: string
  category_en: string
  price: number
  stock: number
  available: boolean
  image_url?: string
  certifications: string[]
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
  status: "new" | "read" | "replied"
}

export interface SiteContent {
  id: string
  key: string
  value_fr: string
  value_en: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  name_en: string
  description: string
  description_en: string
  icon: string
  created_at: string
  updated_at: string
}


export interface ContactInfo {
  id: string
  key: string
  value: string
  updated_at: string
}