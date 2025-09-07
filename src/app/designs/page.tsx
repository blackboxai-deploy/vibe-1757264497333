'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MarbleDesign } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DesignGallery, DesignComparison } from '@/components/DesignGallery';
import { 
  MARBLE_DESIGNS, 
  getDesignsByType, 
  getBudgetDesigns, 
  getPremiumDesigns, 
  getPopularDesigns,
  getDesignsByColor,
  getAllColors,
  getAllOrigins,
  getPriceCategory 
} from '@/lib/designs';

function DesignsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<'gallery' | 'comparison'>('gallery');
  const [selectedDesign, setSelectedDesign] = useState<MarbleDesign | null>(null);

  const getFilteredDesigns = () => {
    switch (selectedCategory) {
      case 'popular':
        return getPopularDesigns();
      case 'budget':
        return getBudgetDesigns();
      case 'premium':
        return getPremiumDesigns();
      case 'natural':
        return getDesignsByType('Natural Marble');
      case 'engineered':
        return getDesignsByType('Engineered Stone');
      case 'white':
        return getDesignsByColor('White');
      case 'dark':
        return MARBLE_DESIGNS.filter(d => 
          d.color.toLowerCase().includes('black') || 
          d.color.toLowerCase().includes('dark') ||
          d.color.toLowerCase().includes('gray')
        );
      default:
        return MARBLE_DESIGNS;
    }
  };

  const filteredDesigns = getFilteredDesigns();
  const colors = getAllColors();
  const origins = getAllOrigins();

  const handleDesignSelect = (design: MarbleDesign) => {
    setSelectedDesign(design);
  };

  const handleBookWithDesign = (design: MarbleDesign) => {
    window.location.href = `/calculator?design=${design.id}`;
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Marble Design Gallery
            </h1>
            <p className="text-xl text-slate-300">
              Explore our curated collection of premium marble designs from quarries around the world. 
              Find the perfect marble for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                <a href="/calculator">Get Quote with Design</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900" asChild>
                <a href="/book">Book Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Stats */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{MARBLE_DESIGNS.length}</div>
                <div className="text-slate-600">Design Options</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{origins.length}</div>
                <div className="text-slate-600">Countries</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{colors.length}</div>
                <div className="text-slate-600">Color Variations</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-slate-600">Material Types</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Categories */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Browse by Category</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find the perfect marble design for your project with our organized categories
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { key: 'all', label: `All Designs (${MARBLE_DESIGNS.length})`, count: MARBLE_DESIGNS.length },
              { key: 'popular', label: `Popular (${getPopularDesigns().length})`, count: getPopularDesigns().length },
              { key: 'budget', label: `Budget-Friendly (${getBudgetDesigns().length})`, count: getBudgetDesigns().length },
              { key: 'premium', label: `Premium (${getPremiumDesigns().length})`, count: getPremiumDesigns().length },
              { key: 'white', label: `White Marble (${getDesignsByColor('White').length})`, count: getDesignsByColor('White').length },
              { key: 'dark', label: 'Dark Marble', count: 0 },
              { key: 'natural', label: `Natural (${getDesignsByType('Natural Marble').length})`, count: getDesignsByType('Natural Marble').length },
              { key: 'engineered', label: `Engineered (${getDesignsByType('Engineered Stone').length})`, count: getDesignsByType('Engineered Stone').length }
            ].map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.key)}
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-end gap-2 mb-8">
            <Button
              variant={viewMode === 'gallery' ? 'default' : 'outline'}
              onClick={() => setViewMode('gallery')}
              size="sm"
            >
              Gallery View
            </Button>
            <Button
              variant={viewMode === 'comparison' ? 'default' : 'outline'}
              onClick={() => setViewMode('comparison')}
              size="sm"
            >
              Comparison View
            </Button>
          </div>

          {/* Design Display */}
          {viewMode === 'gallery' ? (
            <DesignGallery
              selectedDesignId={selectedDesign?.id}
              onDesignSelect={handleDesignSelect}
              maxItems={undefined}
            />
          ) : (
            <DesignComparison designs={filteredDesigns} />
          )}

          {filteredDesigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">No designs found</div>
              <p className="text-slate-600">Try selecting a different category.</p>
              <Button variant="outline" onClick={() => setSelectedCategory('all')} className="mt-4">
                Show All Designs
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Design Details Modal */}
      {selectedDesign && (
        <section className="py-16 bg-slate-50">
          <div className="container px-4 md:px-6">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{selectedDesign.name}</CardTitle>
                    <CardDescription className="text-lg">{selectedDesign.type}</CardDescription>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant="outline" className="text-sm">
                      {getPriceCategory(selectedDesign.priceMultiplier)}
                    </Badge>
                    <div className="text-lg font-semibold">
                      {selectedDesign.priceMultiplier > 1 
                        ? `+${((selectedDesign.priceMultiplier - 1) * 100).toFixed(0)}%` 
                        : selectedDesign.priceMultiplier < 1
                        ? `-${((1 - selectedDesign.priceMultiplier) * 100).toFixed(0)}%`
                        : 'Standard Pricing'
                      }
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={selectedDesign.image}
                      alt={selectedDesign.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Design Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Color:</span>
                          <div className="font-medium">{selectedDesign.color}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Pattern:</span>
                          <div className="font-medium">{selectedDesign.pattern}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Origin:</span>
                          <div className="font-medium">{selectedDesign.origin}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Type:</span>
                          <div className="font-medium">{selectedDesign.type}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-slate-600">{selectedDesign.description}</p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => handleBookWithDesign(selectedDesign)}
                      >
                        Get Quote with This Design
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" asChild>
                          <a href={`/book?design=${selectedDesign.id}`}>Book Consultation</a>
                        </Button>
                        <Button variant="ghost" onClick={() => setSelectedDesign(null)}>
                          Close Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Design Guide */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Design Selection Guide</h2>
              <p className="text-slate-600">Choose the right marble design for your space</p>
            </div>

            <Tabs defaultValue="by-room" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="by-room">By Room</TabsTrigger>
                <TabsTrigger value="by-style">By Style</TabsTrigger>
                <TabsTrigger value="by-budget">By Budget</TabsTrigger>
              </TabsList>
              
              <TabsContent value="by-room" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      room: "Kitchen",
                      recommendation: "Calacatta Gold or Engineered Carrara",
                      reason: "Stain-resistant with elegant veining for countertops"
                    },
                    {
                      room: "Bathroom",
                      recommendation: "Thassos Pure or Gray Cloud",
                      reason: "Water-resistant with clean, spa-like appearance"
                    },
                    {
                      room: "Living Room",
                      recommendation: "Carrara Classic or Botticino Classic",
                      reason: "Timeless elegance with durability for high-traffic areas"
                    },
                    {
                      room: "Entryway",
                      recommendation: "Emperador Dark or Nero Marquina",
                      reason: "Dramatic impact with excellent durability"
                    }
                  ].map((guide, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{guide.room}</h3>
                          <p className="text-slate-900 font-medium">{guide.recommendation}</p>
                          <p className="text-slate-600 text-sm">{guide.reason}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="by-style" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      style: "Modern Minimalist",
                      designs: ["Thassos Pure", "Engineered Carrara"],
                      description: "Clean lines with subtle patterns"
                    },
                    {
                      style: "Classic Traditional",
                      designs: ["Carrara Classic", "Calacatta Gold"],
                      description: "Timeless veining with sophisticated appeal"
                    },
                    {
                      style: "Bold Contemporary",
                      designs: ["Nero Marquina", "Verde Guatemala"],
                      description: "Dramatic colors and striking patterns"
                    },
                    {
                      style: "Warm Transitional",
                      designs: ["Emperador Dark", "Botticino Classic"],
                      description: "Rich tones that complement any decor"
                    }
                  ].map((guide, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{guide.style}</h3>
                          <p className="text-slate-900 font-medium">{guide.designs.join(", ")}</p>
                          <p className="text-slate-600 text-sm">{guide.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="by-budget" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <Badge variant="default">Budget-Friendly</Badge>
                        <h3 className="font-semibold text-lg">Under Standard Cost</h3>
                        <p className="text-slate-600 text-sm">
                          High-quality designs at competitive prices
                        </p>
                        <div className="space-y-2">
                          {getBudgetDesigns().slice(0, 3).map((design) => (
                            <div key={design.id} className="text-sm">
                              <span className="font-medium">{design.name}</span>
                              <span className="text-slate-500 ml-2">
                                {((1 - design.priceMultiplier) * 100).toFixed(0)}% savings
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <Badge variant="secondary">Standard</Badge>
                        <h3 className="font-semibold text-lg">Standard Pricing</h3>
                        <p className="text-slate-600 text-sm">
                          Popular designs with great value
                        </p>
                        <div className="space-y-2">
                          {MARBLE_DESIGNS.filter(d => d.priceMultiplier >= 1.0 && d.priceMultiplier <= 1.3).slice(0, 3).map((design) => (
                            <div key={design.id} className="text-sm">
                              <span className="font-medium">{design.name}</span>
                              <span className="text-slate-500 ml-2">
                                {design.priceMultiplier === 1.0 ? 'Standard' : `+${((design.priceMultiplier - 1) * 100).toFixed(0)}%`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <Badge variant="outline">Premium</Badge>
                        <h3 className="font-semibold text-lg">Luxury Options</h3>
                        <p className="text-slate-600 text-sm">
                          Rare and exotic designs for discerning tastes
                        </p>
                        <div className="space-y-2">
                          {getPremiumDesigns().slice(0, 3).map((design) => (
                            <div key={design.id} className="text-sm">
                              <span className="font-medium">{design.name}</span>
                              <span className="text-slate-500 ml-2">
                                +{((design.priceMultiplier - 1) * 100).toFixed(0)}% premium
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Found Your Perfect Design?</h2>
            <p className="text-xl text-slate-300">
              Get an instant quote with your selected design or schedule a consultation to see samples in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                <a href="/calculator">Get Quote Now</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900" asChild>
                <a href="/book">Book Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default function DesignsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading designs...</div>}>
      <DesignsContent />
    </Suspense>
  );
}