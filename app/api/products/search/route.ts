import { NextResponse } from "next/server"
import { searchProducts } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || undefined
    const category = searchParams.get("category") || undefined
    const available = searchParams.get("available") ? searchParams.get("available") === "true" : undefined

    const products = await searchProducts(query, category, available)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
