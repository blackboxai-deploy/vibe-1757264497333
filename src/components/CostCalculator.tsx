'use client';

import { useState, useEffect } from 'react';
import { Service, MarbleDesign, TimeSlot, PriceBreakdown } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SERVICES } from '@/lib/services';
import { MARBLE_DESIGNS } from '@/lib/designs';
import { calculatePrice, formatPrice, PRICING_CONFIG } from '@/lib/pricing';

interface CostCalculatorProps {
  selectedServiceId?: string;
  selectedDesignId?: string;
  onQuoteGenerated?: (quote: PriceBreakdown, service: Service, design: MarbleDesign, area: number) => void;
  className?: string;
}

export function CostCalculator({ 
  selectedServiceId = '',
  selectedDesignId = '',
  onQuoteGenerated,
  className = '' 
}: CostCalculatorProps) {
  const [serviceId, setServiceId] = useState(selectedServiceId);
  const [designId, setDesignId] = useState(selectedDesignId);
  const [area, setArea] = useState<number>(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isPremiumTime, setIsPremiumTime] = useState(false);
  const [quote, setQuote] = useState<PriceBreakdown | null>(null);

  const selectedService = SERVICES.find(s => s.id === serviceId);
  const selectedDesign = MARBLE_DESIGNS.find(d => d.id === designId);

  // Calculate quote whenever inputs change
  useEffect(() => {
    if (selectedService && selectedDesign && area > 0) {
      const mockTimeSlot: TimeSlot = {
        id: 'mock',
        date: new Date(),
        startTime: '09:00',
        endTime: '17:00',
        available: true,
        premium: isPremiumTime
      };

      const newQuote = calculatePrice(
        selectedService,
        selectedDesign,
        area,
        mockTimeSlot,
        selectedExtras
      );

      setQuote(newQuote);

      if (onQuoteGenerated) {
        onQuoteGenerated(newQuote, selectedService, selectedDesign, area);
      }
    } else {
      setQuote(null);
    }
  }, [serviceId, designId, area, selectedExtras, isPremiumTime, selectedService, selectedDesign, onQuoteGenerated]);

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleAreaChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setArea(Math.max(0, numValue));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Cost Calculator</CardTitle>
          <CardDescription>
            Get an instant estimate for your marble installation project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <Select value={serviceId} onValueChange={setServiceId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service..." />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{service.name}</span>
                      <span className="ml-2 text-sm text-slate-500">
                        {formatPrice(service.basePrice)}/sq ft
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Input */}
          <div className="space-y-2">
            <Label htmlFor="area">Area (Square Feet)</Label>
            <Input
              id="area"
              type="number"
              placeholder="Enter area in square feet"
              value={area || ''}
              onChange={(e) => handleAreaChange(e.target.value)}
              min="1"
              step="0.1"
            />
            {selectedService && area > 0 && area < selectedService.minArea && (
              <p className="text-sm text-amber-600">
                Minimum area for this service is {selectedService.minArea} sq ft. 
                Minimum charge of {formatPrice(PRICING_CONFIG.minimumCharge)} will apply.
              </p>
            )}
          </div>

          {/* Design Selection */}
          <div className="space-y-2">
            <Label htmlFor="design">Marble Design</Label>
            <Select value={designId} onValueChange={setDesignId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a design..." />
              </SelectTrigger>
              <SelectContent>
                {MARBLE_DESIGNS.map((design) => (
                  <SelectItem key={design.id} value={design.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{design.name}</span>
                      <div className="ml-2 text-sm">
                        <Badge variant="outline" className="text-xs">
                          {design.priceMultiplier > 1 
                            ? `+${((design.priceMultiplier - 1) * 100).toFixed(0)}%` 
                            : design.priceMultiplier < 1
                            ? `-${((1 - design.priceMultiplier) * 100).toFixed(0)}%`
                            : 'Standard'
                          }
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <Label>Additional Services</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRICING_CONFIG.standardExtras.map((extra) => (
                <div key={extra.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={extra.id}
                    checked={selectedExtras.includes(extra.id)}
                    onCheckedChange={() => handleExtraToggle(extra.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={extra.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {extra.name}
                    </label>
                    <p className="text-xs text-slate-600">
                      {extra.description}
                    </p>
                    <p className="text-xs text-slate-900 font-medium">
                      {formatPrice(extra.price)}
                      {(extra.id === 'old_removal' || extra.id === 'sealing') && '/sq ft'}
                      {extra.id === 'edge_finishing' && '/linear ft'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Time */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="premium-time"
              checked={isPremiumTime}
              onCheckedChange={(checked) => setIsPremiumTime(checked === true)}
            />
            <label
              htmlFor="premium-time"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Premium time slot (evenings/weekends) - {((PRICING_CONFIG.premiumTimeMultiplier - 1) * 100)}% extra
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      {quote && selectedService && selectedDesign && area > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between">
              <span>Price Breakdown</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {formatPrice(quote.total)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Base Cost */}
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{selectedService.name}</span>
                <div className="text-sm text-slate-600">
                  {formatPrice(quote.baseLabor)}/sq ft × {area} sq ft
                  {quote.designMultiplier !== 1 && (
                    <span> × {quote.designMultiplier} (design premium)</span>
                  )}
                </div>
              </div>
              <span className="font-semibold">{formatPrice(quote.areaTotal)}</span>
            </div>

            {/* Extras */}
            {quote.extras.filter(e => e.selected).length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium text-sm text-slate-600">Additional Services:</div>
                  {quote.extras.filter(e => e.selected).map((extra) => {
                    let extraCost = extra.price;
                    if (extra.id === 'old_removal' || extra.id === 'sealing') {
                      extraCost = extra.price * area;
                    } else if (extra.id === 'edge_finishing') {
                      extraCost = extra.price * (area * 0.4);
                    }
                    
                    return (
                      <div key={extra.id} className="flex justify-between items-center text-sm">
                        <span>{extra.name}</span>
                        <span>{formatPrice(extraCost)}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Premium Time */}
            {quote.premiumTime > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Premium Time Slot</span>
                  <span>{formatPrice(quote.premiumTime)}</span>
                </div>
              </>
            )}

            <Separator />
            
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Cost</span>
              <span>{formatPrice(quote.total)}</span>
            </div>

            <div className="text-sm text-slate-600">
              <span className="font-medium">Per square foot:</span> {formatPrice(quote.total / area)}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" asChild>
                <a href={`/book?service=${serviceId}&design=${designId}&area=${area}`}>
                  Book This Service
                </a>
              </Button>
              <Button variant="outline">
                Share Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="text-sm text-slate-600 space-y-2">
            <div className="font-medium text-slate-900">Important Notes:</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>Prices include professional installation and basic cleanup</li>
              <li>Minimum service charge of {formatPrice(PRICING_CONFIG.minimumCharge)} applies</li>
              <li>Final quote may vary based on site conditions and measurements</li>
              <li>All work comes with a 5-year guarantee</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}