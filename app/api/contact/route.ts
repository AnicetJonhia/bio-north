import { NextResponse } from "next/server"
import { createContactMessage } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation basique
    const { first_name, last_name, email, subject, message } = body

    if (!first_name || !last_name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const contactMessage = await createContactMessage(body)

    // Ici vous pourriez ajouter l'envoi d'email de notification
    console.log("New contact message received:", {
      id: contactMessage.id,
      from: `${first_name} ${last_name}`,
      email,
      subject,
      message,
    })

    return NextResponse.json(
      {
        message: "Message sent successfully",
        id: contactMessage.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
