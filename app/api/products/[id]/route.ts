import { NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct } from "@/lib/database"
import { isAuthenticated } from "@/lib/auth"
import { isUUID } from "@/lib/validators"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!isUUID(id)) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 404 })
    }

    const product = await getProductById(id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (!isUUID(id)) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 404 })
    }

    const body = await request.json()

    const product = await updateProduct(id, body)
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (!isUUID(id)) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 404 })
    }

    await deleteProduct(id)
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
