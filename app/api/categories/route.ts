import { NextResponse } from "next/server"
import { getCategories, createCategory } from "@/lib/database"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validation des données requises
    if (!body.name || !body.name_en) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const category = await createCategory(body)
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
