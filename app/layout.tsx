import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bio North Madagascar - Produits Bio & Locaux de Madagascar",
  description:
    "Découvrez l'authenticité des produits biologiques malgaches de la région SAVA. Épices, huiles essentielles, plantes médicinales et produits artisanaux de qualité exceptionnelle.",
  keywords: "Bio, Bio North, bio, bio north , bionorth, Bio North Madagascar, Madagascar, produits locaux, épices, vanille, SAVA, Andapa, agriculture biologique",
  authors: [{ name: "Bio North Madagascar" }],
  openGraph: {
    title: "Bio North Madagascar - Produits Bio & Locaux",
    description: "Produits biologiques authentiques de Madagascar",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'AnicetJonhia'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
    <meta name="darkreader" content="NO-DARKREADER-PLUGIN" />

      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
