import { Service, MarbleDesign, PriceBreakdown, PriceExtra, TimeSlot } from '@/types';

// Base pricing configuration
export const PRICING_CONFIG = {
  // Base labor rates per square foot by service type
  baseLaborRates: {
    flooring: 25,      // $25 per sq ft
    countertops: 35,   // $35 per sq ft
    walls: 30,         // $30 per sq ft
    stairs: 45,        // $45 per sq ft
    bathrooms: 40      // $40 per sq ft
  },
  
  // Minimum charges
  minimumArea: 10,     // 10 sq ft minimum
  minimumCharge: 250,  // $250 minimum service charge
  
  // Time premium rates
  premiumTimeMultiplier: 1.2, // 20% extra for premium time slots
  
  // Common extras
  standardExtras: [
    {
      id: 'material_delivery',
      name: 'Material Delivery',
      description: 'Professional delivery and handling of marble materials',
      price: 50,
      selected: false
    },
    {
      id: 'old_removal',
      name: 'Old Surface Removal',
      description: 'Removal and disposal of existing surface material',
      price: 5, // per sq ft
      selected: false
    },
    {
      id: 'edge_finishing',
      name: 'Premium Edge Finishing',
      description: 'Professional edge polishing and finishing',
      price: 8, // per linear foot (estimated as area * 0.4)
      selected: false
    },
    {
      id: 'sealing',
      name: 'Protective Sealing',
      description: 'High-quality sealing for long-lasting protection',
      price: 3, // per sq ft
      selected: false
    },
    {
      id: 'same_day',
      name: 'Same Day Service',
      description: 'Priority same-day service completion',
      price: 100,
      selected: false
    },
    {
      id: 'weekend',
      name: 'Weekend Service',
      description: 'Weekend or holiday service availability',
      price: 75,
      selected: false
    }
  ]
};

/**
 * Calculate total price for a marble construction service
 */
export function calculatePrice(
  service: Service,
  design: MarbleDesign,
  area: number,
  timeSlot?: TimeSlot,
  selectedExtras: string[] = []
): PriceBreakdown {
  // Ensure minimum area
  const effectiveArea = Math.max(area, PRICING_CONFIG.minimumArea);
  
  // Base labor cost
  const baseLabor = service.basePrice;
  
  // Apply design multiplier
  const designMultiplier = design.priceMultiplier;
  const laborWithDesign = baseLabor * designMultiplier;
  
  // Calculate area total
  const areaTotal = laborWithDesign * effectiveArea;
  
  // Apply minimum charge if necessary
  const subtotal = Math.max(areaTotal, PRICING_CONFIG.minimumCharge);
  
  // Calculate extras
  const extras: PriceExtra[] = PRICING_CONFIG.standardExtras.map(extra => ({
    ...extra,
    selected: selectedExtras.includes(extra.id)
  }));
  
  let extrasTotal = 0;
  extras.forEach(extra => {
    if (extra.selected) {
      if (extra.id === 'old_removal' || extra.id === 'sealing') {
        // Per square foot extras
        extrasTotal += extra.price * effectiveArea;
      } else if (extra.id === 'edge_finishing') {
        // Per linear foot (estimated)
        const estimatedLinearFeet = effectiveArea * 0.4;
        extrasTotal += extra.price * estimatedLinearFeet;
      } else {
        // Fixed price extras
        extrasTotal += extra.price;
      }
    }
  });
  
  // Premium time calculation
  let premiumTime = 0;
  if (timeSlot && timeSlot.premium) {
    premiumTime = subtotal * (PRICING_CONFIG.premiumTimeMultiplier - 1);
  }
  
  const total = subtotal + extrasTotal + premiumTime;
  
  return {
    baseLabor,
    designMultiplier,
    areaTotal: subtotal,
    extras,
    premiumTime,
    total: Math.round(total * 100) / 100 // Round to 2 decimal places
  };
}

/**
 * Get estimated duration for a service based on area
 */
export function getEstimatedDuration(service: Service, area: number): number {
  const baseHours = service.duration;
  const areaFactor = Math.max(1, area / 50); // 50 sq ft as base
  return Math.ceil(baseHours * areaFactor);
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate price per square foot display
 */
export function getPricePerSqFt(total: number, area: number): string {
  const pricePerSqFt = total / Math.max(area, 1);
  return formatPrice(pricePerSqFt);
}

/**
 * Generate price quote summary
 */
export function generatePriceQuote(priceBreakdown: PriceBreakdown, area: number): string {
  const { baseLabor, designMultiplier, areaTotal, extras, premiumTime, total } = priceBreakdown;
  
  let quote = `Price Breakdown:\n`;
  quote += `• Base Labor: ${formatPrice(baseLabor)} per sq ft\n`;
  
  if (designMultiplier !== 1) {
    quote += `• Design Premium: ${((designMultiplier - 1) * 100).toFixed(0)}% additional\n`;
  }
  
  quote += `• Area Coverage: ${area} sq ft = ${formatPrice(areaTotal)}\n`;
  
  if (extras.some(e => e.selected)) {
    quote += `• Additional Services:\n`;
    extras.filter(e => e.selected).forEach(extra => {
      quote += `  - ${extra.name}: ${formatPrice(extra.price)}\n`;
    });
  }
  
  if (premiumTime > 0) {
    quote += `• Premium Time Slot: ${formatPrice(premiumTime)}\n`;
  }
  
  quote += `\nTotal: ${formatPrice(total)}`;
  quote += ` (${getPricePerSqFt(total, area)} per sq ft)`;
  
  return quote;
}