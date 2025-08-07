"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { useLanguage } from "@/contexts/language-context"
import { useContactInfo } from "@/hooks/use-contact-info"

export default function ContactPage() {
  const { t } = useLanguage()
    const { contactInfo } = useContactInfo()


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 mb-4">{t.contact.hero.badge}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.contact.hero.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.contact.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.contact.form.title}</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.contact.info.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{t.contact.info.description}</p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{t.contact.info.address.title}</CardTitle>
                        <CardDescription>{t.contact.info.address.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{t.contact.info.address.value}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{t.contact.info.phone.title}</CardTitle>
                        <CardDescription>{t.contact.info.phone.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">{t.contact.info.phone.value}</p>
                    <p className="text-sm text-gray-500">{t.contact.info.phone.hours}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{t.contact.info.email.title}</CardTitle>
                        <CardDescription>{t.contact.info.email.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">{t.contact.info.email.value}</p>
                    <p className="text-sm text-gray-500">{t.contact.info.email.response}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{t.contact.info.schedule.title}</CardTitle>
                        <CardDescription>{t.contact.info.schedule.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-gray-700">
                      <p>{t.contact.info.schedule.weekdays}</p>
                      <p>{t.contact.info.schedule.saturday}</p>
                      <p>{t.contact.info.schedule.sunday}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.contact.info.social}</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.contact.map.title}</h2>
            <p className="text-xl text-gray-600">{t.contact.map.description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.contact.map.location}</h3>
                <p className="text-gray-600">{t.contact.map.coming}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
