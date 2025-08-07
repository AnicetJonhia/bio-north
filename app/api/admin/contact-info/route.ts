import { NextResponse } from "next/server"
import { getContactInfo, updateContactInfo } from "@/lib/database"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {

    const contactInfo = await getContactInfo()
    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 })
  }
}

export async function PUT(request: Request) {


  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { updates } = body

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid updates format" }, { status: 400 })
    }

    const results = []
    for (const update of updates) {
      const { key, value } = update
      if (!key || value === undefined) {
        continue
      }
      const result = await updateContactInfo(key, value)
      results.push(result)
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error updating contact info:", error)
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 })
  }
}
