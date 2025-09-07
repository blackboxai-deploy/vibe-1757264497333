'use client';

import { useState } from 'react';
import { ServiceCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ServiceGrid, ServiceComparison } from '@/components/ServiceCard';
import { SERVICES, getServicesByCategory, getAllCategories, getCategoryDisplayName } from '@/lib/services';
import { formatPrice } from '@/lib/pricing';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'comparison'>('grid');
  
  const categories = getAllCategories();
  const displayServices = selectedCategory === 'all' ? SERVICES : getServicesByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Professional Marble Services
            </h1>
            <p className="text-xl text-slate-300">
              Expert installation services for all your marble construction needs. 
              Transparent pricing, guaranteed quality, and professional craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                <a href="/calculator">Get Instant Quote</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                <a href="tel:1-800-627-2531">Call 1-800-MARBLE-1</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Stats */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{SERVICES.length}</div>
                <div className="text-slate-600">Service Types</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(Math.min(...SERVICES.map(s => s.basePrice)))}
                </div>
                <div className="text-slate-600">Starting Price/sq ft</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-slate-600">Projects Completed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">5 Years</div>
                <div className="text-slate-600">Guarantee</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Catalog */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of marble installation services. 
              Each service includes professional installation, cleanup, and our quality guarantee.
            </p>
          </div>

          {/* Filter and View Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Services ({SERVICES.length})
              </Button>
              {categories.map((category) => {
                const count = getServicesByCategory(category).length;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {getCategoryDisplayName(category)} ({count})
                  </Button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                onClick={() => setViewMode('comparison')}
                size="sm"
              >
                Compare
              </Button>
            </div>
          </div>

          {/* Services Display */}
          {viewMode === 'grid' ? (
            <ServiceGrid services={displayServices} />
          ) : (
            <ServiceComparison services={displayServices} />
          )}

          {displayServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">No services found</div>
              <p className="text-slate-600">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Service Categories Detail */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Service Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Specialized services for every marble installation need
            </p>
          </div>

          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs lg:text-sm">
                  {getCategoryDisplayName(category)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => {
              const categoryServices = getServicesByCategory(category);
              return (
                <TabsContent key={category} value={category} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{getCategoryDisplayName(category)}</span>
                        <Badge variant="secondary">
                          {categoryServices.length} Service{categoryServices.length !== 1 ? 's' : ''}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {getCategoryDescription(category)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ServiceGrid services={categoryServices} />
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Services?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Installation",
                description: "Certified professionals with specialized marble installation training",
                icon: "🏆"
              },
              {
                title: "Quality Materials",
                description: "Premium marble sourced directly from trusted quarries worldwide",
                icon: "💎"
              },
              {
                title: "Transparent Pricing",
                description: "Upfront pricing with detailed breakdowns - no hidden fees",
                icon: "📊"
              },
              {
                title: "Fast Service",
                description: "Efficient installation with minimal disruption to your daily routine",
                icon: "⚡"
              },
              {
                title: "Guaranteed Work",
                description: "5-year comprehensive warranty on all installation work",
                icon: "🛡️"
              },
              {
                title: "Flexible Scheduling",
                description: "Evening and weekend appointments available for your convenience",
                icon: "📅"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300">
              Get your free consultation and detailed quote today. Our experts are ready to transform your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                <a href="/calculator">Get Free Quote</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900" asChild>
                <a href="/book">Book Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryDescription(category: ServiceCategory): string {
  const descriptions: Record<ServiceCategory, string> = {
    [ServiceCategory.FLOORING]: "Transform your floors with elegant marble installation. Perfect for living rooms, bedrooms, and commercial spaces.",
    [ServiceCategory.COUNTERTOPS]: "Premium marble countertops for kitchens and bathrooms with custom edge finishing and seamless integration.",
    [ServiceCategory.WALLS]: "Create stunning accent walls and feature areas with professional marble cladding installation.",
    [ServiceCategory.STAIRS]: "Elegant marble staircase installation with safety compliance and non-slip finishing.",
    [ServiceCategory.BATHROOMS]: "Complete marble bathroom transformations including floors, walls, and shower areas."
  };
  
  return descriptions[category] || "Professional marble installation services";
}