import { NextResponse } from "next/server"
import { updateContactMessageStatus, deleteContactMessage, getContactMessageById } from "@/lib/database"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const message = await getContactMessageById(id)
    return NextResponse.json(message)
  } catch (error) {
    console.error("Error fetching message:", error)
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!["new", "read", "replied"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const message = await updateContactMessageStatus(id, status)
    return NextResponse.json(message)
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await deleteContactMessage(id)
    return NextResponse.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
