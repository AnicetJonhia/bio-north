"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, MapPin, Users, Award, ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useContactInfo } from "@/hooks/use-contact-info"

export default function HomePage() {
  const { t } = useLanguage()
    const { getContactValue } = useContactInfo()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <Leaf className="w-4 h-4 mr-2" />
                  {t.home.hero.badge}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{t.home.hero.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t.home.hero.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/products">
                    {t.home.hero.cta1}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  asChild
                >
                  <Link href="/about">
                    <Play className="w-5 h-5 mr-2" />
                    {t.home.hero.cta2}
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">{t.home.hero.stats.bio}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{t.home.hero.stats.local}</div>
                  <div className="text-sm text-gray-600">Madagascar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">SAVA</div>
                  <div className="text-sm text-gray-600">{t.home.hero.stats.region}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Produits bio malgaches"
                  width={500}
                  height={600}
                  className="object-cover w-full h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-4 top-20 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm">{getContactValue("address")}</div>

                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-20 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm">Qualité</div>
                    <div className="text-xs text-gray-600">Certifiée Bio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.home.services.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.home.services.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t.home.services.spices.title}</CardTitle>
                <CardDescription>{t.home.services.spices.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                  alt="Épices malgaches"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 mb-4"
                />
                <Button variant="outline" className="w-full group-hover:bg-green-50 bg-transparent" asChild>
                  <Link href="/products?category=Épices & Aromates">{t.home.services.learnMore}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t.home.services.processed.title}</CardTitle>
                <CardDescription>{t.home.services.processed.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                  alt="Produits transformés"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 mb-4"
                />
                <Button variant="outline" className="w-full group-hover:bg-green-50 bg-transparent" asChild>
                  <Link href="/products?category=Produits Transformés">{t.home.services.learnMore}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t.home.services.medicinal.title}</CardTitle>
                <CardDescription>{t.home.services.medicinal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                  alt="Plantes médicinales"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 mb-4"
                />
                <Button variant="outline" className="w-full group-hover:bg-green-50 bg-transparent" asChild>
                  <Link href="/products?category=Plantes Médicinales">{t.home.services.learnMore}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="À propos de Bio North Madagascar"
                width={600}
                height={500}
                className="rounded-2xl object-cover w-full h-[500px]"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge className="bg-green-100 text-green-800 mb-4">{t.home.about.badge}</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.home.about.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{t.home.about.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.home.about.values.organic.title}</h3>
                    <p className="text-gray-600">{t.home.about.values.organic.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.home.about.values.fair.title}</h3>
                    <p className="text-gray-600">{t.home.about.values.fair.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.home.about.values.quality.title}</h3>
                    <p className="text-gray-600">{t.home.about.values.quality.description}</p>
                  </div>
                </div>
              </div>

              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/about">
                  {t.home.about.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.home.cta.title}</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">{t.home.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/products">{t.home.cta.products}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              asChild
            >
              <Link href="/contact">{t.home.cta.contact}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
