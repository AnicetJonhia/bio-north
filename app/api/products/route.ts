import { NextResponse } from "next/server"
import { getProducts, createProduct } from "@/lib/database"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification pour créer un produit
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validation des données requises
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const product = await createProduct(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
