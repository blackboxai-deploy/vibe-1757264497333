'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SERVICES, getFeaturedServices } from '@/lib/services';
import { getPopularDesigns } from '@/lib/designs';
import { formatPrice } from '@/lib/pricing';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string>('');
  const featuredServices = getFeaturedServices();
  const popularDesigns = getPopularDesigns();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your Space with
                <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {' '}Premium Marble
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-slate-600 md:text-2xl">
                Professional marble installation services with transparent pricing, expert craftsmanship, and guaranteed quality.
                Book your consultation today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="/calculator">Get Instant Quote</a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <a href="/services">View Services</a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>500+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span>5-Year Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Premium Services
            </h2>
            <p className="mx-auto max-w-[600px] text-slate-600 md:text-xl">
              Professional marble installation with transparent pricing and expert craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <Badge variant="secondary">{formatPrice(service.basePrice)}/sq ft</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Duration:</span> {service.duration} hours
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Min Area:</span> {service.minArea} sq ft
                    </div>
                    <Button className="w-full" asChild>
                      <a href={`/book?service=${service.id}`}>Book This Service</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Designs */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Popular Marble Designs
            </h2>
            <p className="mx-auto max-w-[600px] text-slate-600 md:text-xl">
              Choose from our curated selection of premium marble designs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDesigns.map((design) => (
              <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{design.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{design.color}</span>
                      <Badge variant="outline" className="text-xs">
                        {design.priceMultiplier > 1 ? `+${((design.priceMultiplier - 1) * 100).toFixed(0)}%` : 'Standard'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{design.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a href="/designs">View All Designs</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Calculator */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Get Your Instant Quote
              </h2>
              <p className="text-slate-600 md:text-lg">
                Calculate your marble installation cost in seconds
              </p>
            </div>

            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Type</label>
                    <select 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {formatPrice(service.basePrice)}/sq ft
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Area (Square Feet)</label>
                    <input
                      type="number"
                      placeholder="Enter area in sq ft"
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {formatPrice(0)}
                    </div>
                    <p className="text-slate-600">Estimated Total</p>
                    <Button className="mt-4" asChild>
                      <a href="/calculator">Get Detailed Quote</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose MarbleCraft Pro?
            </h2>
            <p className="mx-auto max-w-[600px] text-slate-300 md:text-xl">
              Professional excellence with transparent pricing and guaranteed satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Craftsmanship",
                description: "Certified professionals with years of marble installation experience"
              },
              {
                title: "Transparent Pricing",
                description: "No hidden fees. Get accurate quotes with detailed cost breakdowns"
              },
              {
                title: "Quality Materials",
                description: "Premium marble sourced from trusted quarries worldwide"
              },
              {
                title: "Fast Installation",
                description: "Efficient installation process with minimal disruption to your space"
              },
              {
                title: "5-Year Guarantee",
                description: "Comprehensive warranty on all installation work and materials"
              },
              {
                title: "Flexible Scheduling",
                description: "Book appointments that fit your schedule, including weekends"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-slate-300">
              Get your free consultation and detailed quote today. Our experts are ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6" asChild>
                <a href="/book">Book Free Consultation</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6">
                <a href="tel:1-800-627-2531">Call 1-800-MARBLE-1</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}