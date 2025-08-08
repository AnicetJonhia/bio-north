"use client"

import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Linkedin, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useContactInfo } from "@/hooks/use-contact-info"
import { useCategories } from "@/hooks/use-categories"
import {useCategory} from "@/contexts/category-context";

import type React from "react";


export default function Footer() {
  const { t,locale } = useLanguage()
    const { getContactValue, loading } = useContactInfo()

    const { categories } = useCategories()
    const { setSelectedCategory } = useCategory();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
                { loading ? (
                               <p>{t.common.loading}</p>
                ) : (
                    getContactValue("company_name") && (
                    <span className="font-bold text-lg">{getContactValue("company_name")}</span>)
                )}

            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t.footer.description}</p>
            <div className="flex space-x-4">

                <Link
                    href={getContactValue("facebook") || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Facebook className="w-5 h-5" />
                </Link>


              <Link href={getContactValue("linkedin") || "#"}  target="_blank"
                    rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-green-400 transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  {t.footer.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.ourProducts}</h3>
              {
                loading ? (
                    <p>{t.common.loading}</p>
                ) : (
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`/products?category=${encodeURIComponent(category.name)}`}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {locale === "en" && category.name_en ? category.name_en : category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
              }

          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.contact}</h3>
              { loading ? (
                  <p>{t.common.loading}</p>
              ) : (
              <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="text-gray-400 text-sm">
                          <div>{getContactValue("address")}</div>

                      </div>
                  </div>
                  <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{getContactValue("phone")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{getContactValue("email")}</span>
                  </div>
              </div>
              )}

          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} {getContactValue("company_name")}. {t.footer.rights}
              </p>

              <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
