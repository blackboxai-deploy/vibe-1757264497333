import { MarbleDesign } from '@/types';

export const MARBLE_DESIGNS: MarbleDesign[] = [
  // Classic White Marbles
  {
    id: 'carrara_classic',
    name: 'Carrara Classic',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b09e8636-f679-46f7-9e2d-843b2a10d523.png',
    description: 'Timeless Italian Carrara marble with soft gray veining on a white background. Perfect for any elegant interior.',
    priceMultiplier: 1.2,
    color: 'White',
    pattern: 'Veined',
    origin: 'Italy'
  },
  {
    id: 'calacatta_gold',
    name: 'Calacatta Gold',
    type: 'Premium Natural',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/986508de-ee15-4b01-ba6d-aca90ccbe794.png',
    description: 'Luxurious Calacatta marble featuring dramatic gold and gray veining. A statement piece for high-end projects.',
    priceMultiplier: 1.8,
    color: 'White',
    pattern: 'Bold Veined',
    origin: 'Italy'
  },
  {
    id: 'thassos_pure',
    name: 'Thassos Pure',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4b8e8f42-4c46-48a5-adfe-4eb0a89569ab.png',
    description: 'Pure white Greek marble with a crystalline structure. Ideal for modern minimalist designs.',
    priceMultiplier: 1.3,
    color: 'Pure White',
    pattern: 'Solid',
    origin: 'Greece'
  },

  // Gray and Black Marbles
  {
    id: 'emperador_dark',
    name: 'Emperador Dark',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce19c1c1-1f27-4da8-965d-14d088cad28e.png',
    description: 'Rich dark brown marble with cream and gold veining. Adds warmth and sophistication to any space.',
    priceMultiplier: 1.4,
    color: 'Dark Brown',
    pattern: 'Veined',
    origin: 'Spain'
  },
  {
    id: 'nero_marquina',
    name: 'Nero Marquina',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0fc8bd06-bd8d-49b4-ab8a-b5cca56c930c.png',
    description: 'Deep black Spanish marble with distinctive white veining. Perfect for creating dramatic contrasts.',
    priceMultiplier: 1.5,
    color: 'Black',
    pattern: 'Veined',
    origin: 'Spain'
  },
  {
    id: 'gray_cloud',
    name: 'Gray Cloud',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/32c98aab-add5-4f81-933d-04a9b3985073.png',
    description: 'Contemporary gray marble with cloud-like white patterns. Ideal for modern architectural projects.',
    priceMultiplier: 1.1,
    color: 'Gray',
    pattern: 'Cloudy',
    origin: 'Turkey'
  },

  // Colored Marbles
  {
    id: 'verde_guatemala',
    name: 'Verde Guatemala',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/af5d660c-8499-4e9d-be53-d4a279bb768f.png',
    description: 'Vibrant green marble with natural patterns. Brings a unique natural element to interior spaces.',
    priceMultiplier: 1.6,
    color: 'Green',
    pattern: 'Natural',
    origin: 'Guatemala'
  },
  {
    id: 'rosso_verona',
    name: 'Rosso Verona',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1aaef105-fd25-4851-8a40-2b25520965e1.png',
    description: 'Distinctive red Italian marble with fossil inclusions. A bold choice for feature walls and accents.',
    priceMultiplier: 1.7,
    color: 'Red',
    pattern: 'Fossil',
    origin: 'Italy'
  },

  // Budget-Friendly Options
  {
    id: 'botticino_classic',
    name: 'Botticino Classic',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dfb3641f-1923-42d7-9bff-28f76335b5ba.png',
    description: 'Affordable Italian marble in warm cream tones with subtle natural patterns. Great value for larger projects.',
    priceMultiplier: 0.9,
    color: 'Cream',
    pattern: 'Subtle',
    origin: 'Italy'
  },
  {
    id: 'turkish_cream',
    name: 'Turkish Cream',
    type: 'Natural Marble',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/43d8c7f2-6b01-4a32-bca3-8a733cc14b1a.png',
    description: 'Cost-effective cream marble with uniform texture. Perfect for budget-conscious elegant installations.',
    priceMultiplier: 0.8,
    color: 'Cream',
    pattern: 'Uniform',
    origin: 'Turkey'
  },

  // Engineered Options
  {
    id: 'quartz_calacatta',
    name: 'Engineered Calacatta',
    type: 'Engineered Stone',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fb153868-be6e-483b-a509-2b2dc93d3ece.png',
    description: 'Engineered quartz with Calacatta marble appearance. Consistent veining and superior durability.',
    priceMultiplier: 1.1,
    color: 'White',
    pattern: 'Consistent Veined',
    origin: 'Manufactured'
  },
  {
    id: 'quartz_carrara',
    name: 'Engineered Carrara',
    type: 'Engineered Stone',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3db24d42-1e50-4921-ada2-64360556c35b.png',
    description: 'Engineered stone mimicking classic Carrara marble. Low maintenance with natural marble aesthetics.',
    priceMultiplier: 1.0,
    color: 'White',
    pattern: 'Uniform Veined',
    origin: 'Manufactured'
  }
];

/**
 * Get design by ID
 */
export function getDesignById(id: string): MarbleDesign | undefined {
  return MARBLE_DESIGNS.find(design => design.id === id);
}

/**
 * Get designs by color
 */
export function getDesignsByColor(color: string): MarbleDesign[] {
  return MARBLE_DESIGNS.filter(design => 
    design.color.toLowerCase().includes(color.toLowerCase())
  );
}

/**
 * Get designs by type
 */
export function getDesignsByType(type: string): MarbleDesign[] {
  return MARBLE_DESIGNS.filter(design => design.type === type);
}

/**
 * Get budget-friendly designs (multiplier <= 1.0)
 */
export function getBudgetDesigns(): MarbleDesign[] {
  return MARBLE_DESIGNS.filter(design => design.priceMultiplier <= 1.0);
}

/**
 * Get premium designs (multiplier >= 1.5)
 */
export function getPremiumDesigns(): MarbleDesign[] {
  return MARBLE_DESIGNS.filter(design => design.priceMultiplier >= 1.5);
}

/**
 * Get popular designs (most commonly used)
 */
export function getPopularDesigns(): MarbleDesign[] {
  return MARBLE_DESIGNS.filter(design => 
    ['carrara_classic', 'calacatta_gold', 'emperador_dark', 'nero_marquina'].includes(design.id)
  );
}

/**
 * Search designs by name or description
 */
export function searchDesigns(query: string): MarbleDesign[] {
  const lowercaseQuery = query.toLowerCase();
  return MARBLE_DESIGNS.filter(design =>
    design.name.toLowerCase().includes(lowercaseQuery) ||
    design.description.toLowerCase().includes(lowercaseQuery) ||
    design.color.toLowerCase().includes(lowercaseQuery) ||
    design.pattern.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get all unique colors
 */
export function getAllColors(): string[] {
  const colors = MARBLE_DESIGNS.map(design => design.color);
  return [...new Set(colors)].sort();
}

/**
 * Get all unique patterns
 */
export function getAllPatterns(): string[] {
  const patterns = MARBLE_DESIGNS.map(design => design.pattern);
  return [...new Set(patterns)].sort();
}

/**
 * Get all unique origins
 */
export function getAllOrigins(): string[] {
  const origins = MARBLE_DESIGNS.map(design => design.origin);
  return [...new Set(origins)].sort();
}

/**
 * Get design recommendations based on service type
 */
export function getRecommendedDesigns(serviceCategory: string): MarbleDesign[] {
  switch (serviceCategory.toLowerCase()) {
    case 'flooring':
      // Durable, classic patterns for flooring
      return MARBLE_DESIGNS.filter(design => 
        ['carrara_classic', 'botticino_classic', 'gray_cloud', 'turkish_cream'].includes(design.id)
      );
    
    case 'countertops':
      // Stain-resistant, beautiful patterns for countertops
      return MARBLE_DESIGNS.filter(design => 
        ['calacatta_gold', 'quartz_calacatta', 'quartz_carrara', 'thassos_pure'].includes(design.id)
      );
    
    case 'walls':
      // Statement pieces for wall cladding
      return MARBLE_DESIGNS.filter(design => 
        ['nero_marquina', 'rosso_verona', 'verde_guatemala', 'calacatta_gold'].includes(design.id)
      );
    
    case 'bathrooms':
      // Water-resistant, elegant options
      return MARBLE_DESIGNS.filter(design => 
        ['thassos_pure', 'carrara_classic', 'quartz_carrara', 'gray_cloud'].includes(design.id)
      );
    
    default:
      return getPopularDesigns();
  }
}

/**
 * Get price category for display
 */
export function getPriceCategory(multiplier: number): string {
  if (multiplier <= 1.0) return 'Budget-Friendly';
  if (multiplier <= 1.3) return 'Standard';
  if (multiplier <= 1.6) return 'Premium';
  return 'Luxury';
}