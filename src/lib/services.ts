import { Service, ServiceCategory } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'marble_flooring',
    name: 'Marble Flooring Installation',
    description: 'Professional marble flooring installation with precision cutting and expert fitting. Perfect for living rooms, bedrooms, and commercial spaces.',
    basePrice: 25,
    category: ServiceCategory.FLOORING,
    duration: 6,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db92296d-b50a-4f3d-9154-c4a3f7fe5766.png',
    features: [
      'Precision cutting and fitting',
      'Professional leveling and alignment',
      'Grout application and finishing',
      'Post-installation cleaning',
      'Quality guarantee',
      'Minimal dust installation process'
    ],
    minArea: 15
  },
  {
    id: 'marble_countertops',
    name: 'Marble Countertop Installation',
    description: 'Custom marble countertop installation for kitchens and bathrooms. Expert edge finishing and seamless integration.',
    basePrice: 35,
    category: ServiceCategory.COUNTERTOPS,
    duration: 4,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e87ba4b-07a2-423f-a8f9-a1b390630fee.png',
    features: [
      'Custom measurement and templating',
      'Professional edge finishing',
      'Seamless installation',
      'Sink cutout and fitting',
      'Backsplash integration',
      'Surface protection treatment'
    ],
    minArea: 8
  },
  {
    id: 'marble_walls',
    name: 'Marble Wall Cladding',
    description: 'Transform your walls with elegant marble cladding. Perfect for accent walls, bathrooms, and feature areas.',
    basePrice: 30,
    category: ServiceCategory.WALLS,
    duration: 5,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4e099bed-437c-4c7a-8525-31b1fa4e7caa.png',
    features: [
      'Wall preparation and leveling',
      'Precision marble cutting',
      'Secure mounting system',
      'Seamless joint alignment',
      'Corner and edge finishing',
      'Surface sealing'
    ],
    minArea: 12
  },
  {
    id: 'marble_stairs',
    name: 'Marble Staircase Installation',
    description: 'Elegant marble staircase installation with non-slip finishing. Includes treads, risers, and landing areas.',
    basePrice: 45,
    category: ServiceCategory.STAIRS,
    duration: 8,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ed46790-db54-446e-ba33-de5ce82a46e2.png',
    features: [
      'Custom tread and riser cutting',
      'Non-slip surface treatment',
      'Handrail integration support',
      'Landing area installation',
      'Safety compliance',
      'Professional edge polishing'
    ],
    minArea: 10
  },
  {
    id: 'marble_bathroom',
    name: 'Marble Bathroom Suite',
    description: 'Complete marble bathroom transformation including floors, walls, shower areas, and vanity tops.',
    basePrice: 40,
    category: ServiceCategory.BATHROOMS,
    duration: 10,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/108037a9-4e9a-44fe-8186-4eb3b718a36a.png',
    features: [
      'Waterproof installation',
      'Shower and tub surround',
      'Vanity top installation',
      'Floor and wall coordination',
      'Drainage integration',
      'Moisture protection sealing'
    ],
    minArea: 20
  }
];

/**
 * Get service by ID
 */
export function getServiceById(id: string): Service | undefined {
  return SERVICES.find(service => service.id === id);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter(service => service.category === category);
}

/**
 * Get all service categories
 */
export function getAllCategories(): ServiceCategory[] {
  return Object.values(ServiceCategory);
}

/**
 * Get featured services (top 3 most popular)
 */
export function getFeaturedServices(): Service[] {
  return SERVICES.slice(0, 3);
}

/**
 * Search services by name or description
 */
export function searchServices(query: string): Service[] {
  const lowercaseQuery = query.toLowerCase();
  return SERVICES.filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get service category display name
 */
export function getCategoryDisplayName(category: ServiceCategory): string {
  const displayNames: Record<ServiceCategory, string> = {
    [ServiceCategory.FLOORING]: 'Flooring',
    [ServiceCategory.COUNTERTOPS]: 'Countertops',
    [ServiceCategory.WALLS]: 'Wall Cladding',
    [ServiceCategory.STAIRS]: 'Staircases',
    [ServiceCategory.BATHROOMS]: 'Bathroom Suites'
  };
  
  return displayNames[category] || category;
}

/**
 * Get estimated project timeline
 */
export function getProjectTimeline(serviceId: string, area: number): string {
  const service = getServiceById(serviceId);
  if (!service) return 'Unknown';
  
  const baseDays = Math.ceil(service.duration / 8); // 8 hours per day
  const areaDays = Math.ceil(area / 100); // Additional day per 100 sq ft
  const totalDays = Math.max(1, baseDays + areaDays);
  
  if (totalDays === 1) return 'Same day completion';
  if (totalDays <= 3) return `${totalDays} days`;
  if (totalDays <= 7) return `${totalDays} days (1 week)`;
  
  const weeks = Math.ceil(totalDays / 7);
  return `${weeks} week${weeks > 1 ? 's' : ''} (${totalDays} days)`;
}

/**
 * Get service complexity level
 */
export function getServiceComplexity(serviceId: string): 'Simple' | 'Moderate' | 'Complex' {
  const service = getServiceById(serviceId);
  if (!service) return 'Moderate';
  
  if (service.category === ServiceCategory.COUNTERTOPS || service.category === ServiceCategory.FLOORING) {
    return 'Simple';
  }
  
  if (service.category === ServiceCategory.WALLS) {
    return 'Moderate';
  }
  
  return 'Complex'; // Stairs and Bathrooms
}