import { NextResponse } from "next/server"
import { getProductStats, getMessageStats } from "@/lib/database"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [productStats, messageStats] = await Promise.all([
      getProductStats().catch(() => ({
        totalProducts: 0,
        availableProducts: 0,
        totalStock: 0,
        lowStockProducts: 0,
      })),
      getMessageStats().catch(() => ({
        totalMessages: 0,
        newMessages: 0,
        readMessages: 0,
        repliedMessages: 0,
      })),
    ])

    return NextResponse.json({
      products: productStats,
      messages: messageStats,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
