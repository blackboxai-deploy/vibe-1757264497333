'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Service, MarbleDesign, PriceBreakdown } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CostCalculator } from '@/components/CostCalculator';
import { ServiceGrid } from '@/components/ServiceCard';
import { DesignGallery } from '@/components/DesignGallery';
import { SERVICES } from '@/lib/services';
import { formatPrice, generatePriceQuote } from '@/lib/pricing';

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get('service') || '';
  const initialDesignId = searchParams.get('design') || '';
  const initialArea = parseFloat(searchParams.get('area') || '0');

  const [currentQuote, setCurrentQuote] = useState<{
    quote: PriceBreakdown;
    service: Service;
    design: MarbleDesign;
    area: number;
  } | null>(null);

  const [showServiceSelector, setShowServiceSelector] = useState(!initialServiceId);
  const [showDesignSelector, setShowDesignSelector] = useState(!initialDesignId);

  const handleQuoteGenerated = (
    quote: PriceBreakdown,
    service: Service,
    design: MarbleDesign,
    area: number
  ) => {
    setCurrentQuote({ quote, service, design, area });
  };

  const handleServiceSelect = (service: Service) => {
    setShowServiceSelector(false);
    // The calculator will update automatically through URL or props
  };

  const handleDesignSelect = (design: MarbleDesign) => {
    setShowDesignSelector(false);
    // The calculator will update automatically through URL or props
  };

  const handleShareQuote = () => {
    if (currentQuote) {
      const quoteText = generatePriceQuote(currentQuote.quote, currentQuote.area);
      const shareData = {
        title: 'Marble Installation Quote - MarbleCraft Pro',
        text: `${currentQuote.service.name} with ${currentQuote.design.name}\n\n${quoteText}\n\nGet your quote at:`,
        url: window.location.href
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Quote copied to clipboard!');
      }
    }
  };

  const handleBookNow = () => {
    if (currentQuote) {
      const bookingUrl = `/book?service=${currentQuote.service.id}&design=${currentQuote.design.id}&area=${currentQuote.area}`;
      window.location.href = bookingUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Cost Calculator
            </h1>
            <p className="text-xl text-slate-300">
              Get an instant, detailed quote for your marble installation project. 
              Transparent pricing with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="container px-4 md:px-6 py-12">Loading calculator...</div>}>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <CostCalculator
              selectedServiceId={initialServiceId}
              selectedDesignId={initialDesignId}
              onQuoteGenerated={handleQuoteGenerated}
            />

            {/* Service Selector Modal */}
            {showServiceSelector && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Choose Your Service</CardTitle>
                  <CardDescription>
                    Select the marble installation service you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceGrid
                    services={SERVICES}
                    onServiceSelect={handleServiceSelect}
                    showBookButton={false}
                  />
                </CardContent>
              </Card>
            )}

            {/* Design Selector Modal */}
            {showDesignSelector && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Choose Your Design</CardTitle>
                  <CardDescription>
                    Select from our premium marble designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DesignGallery
                    selectedDesignId={initialDesignId}
                    onDesignSelect={handleDesignSelect}
                    maxItems={8}
                  />
                  <div className="text-center mt-6">
                    <Button variant="outline" asChild>
                      <a href="/designs">View All Designs</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quote Summary */}
            {currentQuote && (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Quote Summary</span>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(currentQuote.quote.total)}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Service:</span>
                      <span>{currentQuote.service.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Design:</span>
                      <span>{currentQuote.design.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Area:</span>
                      <span>{currentQuote.area} sq ft</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Price per sq ft:</span>
                      <span>{formatPrice(currentQuote.quote.total / currentQuote.area)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleBookNow}
                    >
                      Book This Service
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleShareQuote}
                    >
                      Share Quote
                    </Button>
                    <Button variant="ghost" className="w-full text-sm" asChild>
                      <a href="tel:1-800-627-2531">Call for Consultation</a>
                    </Button>
                  </div>

                  <div className="text-xs text-slate-600 pt-4 border-t">
                    <div className="font-medium mb-1">Quote includes:</div>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Professional installation</li>
                      <li>Basic site cleanup</li>
                      <li>5-year warranty</li>
                      <li>Free consultation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Getting Accurate Quotes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <div>
                  <div className="font-medium text-slate-900 mb-1">Measuring Tips:</div>
                  <p>Measure length × width for square/rectangular areas. For irregular shapes, break into sections and add them up.</p>
                </div>
                <div>
                  <div className="font-medium text-slate-900 mb-1">Design Selection:</div>
                  <p>Premium designs may cost more but offer superior aesthetics and value.</p>
                </div>
                <div>
                  <div className="font-medium text-slate-900 mb-1">Final Pricing:</div>
                  <p>Final quotes may vary based on site conditions and exact measurements.</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {SERVICES.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex justify-between items-center text-sm">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-slate-600">Starting at {formatPrice(service.basePrice)}/sq ft</div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/calculator?service=${service.id}`}>Select</a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-slate-900 text-white">
              <CardContent className="pt-6 text-center">
                <div className="space-y-3">
                  <div className="text-lg font-semibold">Need Help?</div>
                  <p className="text-slate-300 text-sm">
                    Speak with our marble experts for personalized recommendations
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <a href="tel:1-800-627-2531">Call 1-800-MARBLE-1</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Calculator FAQ</h2>
              <p className="text-slate-600">Common questions about our pricing calculator</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How accurate are the calculator estimates?",
                  answer: "Our calculator provides estimates within 5-10% of final pricing. Final quotes may vary based on site conditions, exact measurements, and specific requirements."
                },
                {
                  question: "Are there any hidden fees?",
                  answer: "No hidden fees! Our calculator shows all costs upfront. The only potential changes would be for site-specific challenges discovered during consultation."
                },
                {
                  question: "What's included in the price?",
                  answer: "All prices include professional installation, basic site cleanup, materials delivery, and our 5-year warranty. Additional services can be selected in the calculator."
                },
                {
                  question: "How do I measure my space accurately?",
                  answer: "Measure length × width for rectangular areas. For irregular shapes, break into sections. Our team provides free measurement verification during consultation."
                },
                {
                  question: "Can I save my quote?",
                  answer: "Yes! Use the 'Share Quote' button to copy your estimate or book a consultation to save it to your account."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="font-semibold text-lg">{faq.question}</div>
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Suspense>
    </div>
  );
}