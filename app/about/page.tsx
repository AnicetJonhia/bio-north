"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Leaf, Target, Heart, Globe } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useContactInfo } from "@/hooks/use-contact-info"

export default function AboutPage() {
  const { t } = useLanguage()
    const { getContactValue } = useContactInfo()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 mb-4">{t.about.hero.badge}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{ getContactValue("company_name") || t.about.hero.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.about.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.about.story.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t.about.story.p1}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t.about.story.p2}</p>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt={t.about.story.title}
                width={600}
                height={500}
                className="rounded-2xl object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.about.mission.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.about.mission.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>{t.about.mission.values.mission.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.about.mission.values.mission.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>{t.about.mission.values.sustainability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.about.mission.values.sustainability.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>{t.about.mission.values.fairTrade.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.about.mission.values.fairTrade.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Siège social Andapa"
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full h-[400px]"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.about.company.title}</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.about.company.legal.title}</h3>
                    <p className="text-gray-600">{ getContactValue("company_name") || t.about.company.legal.value}</p>
                    <p className="text-sm text-gray-500">{t.about.company.legal.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.about.company.location.title}</h3>
                    <p className="text-gray-600">{ getContactValue("address") || t.about.company.location.value}</p>
                    <p className="text-sm text-gray-500">{t.about.company.location.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.about.company.activity.title}</h3>
                    <p className="text-gray-600">{t.about.company.activity.value}</p>
                    <p className="text-sm text-gray-500">{t.about.company.activity.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.about.company.coverage.title}</h3>
                    <p className="text-gray-600">{t.about.company.coverage.value}</p>
                    <p className="text-sm text-gray-500">{t.about.company.coverage.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.about.commitment.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.about.commitment.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.about.commitment.quality.title}</h3>
              <p className="text-gray-600">{t.about.commitment.quality.description}</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.about.commitment.partnerships.title}</h3>
              <p className="text-gray-600">{t.about.commitment.partnerships.description}</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.about.commitment.environment.title}</h3>
              <p className="text-gray-600">{t.about.commitment.environment.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
