// TypeScript types for Marble Construction Service App

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number; // per square foot
  category: ServiceCategory;
  duration: number; // in hours
  image: string;
  features: string[];
  minArea: number; // minimum square feet
}

export enum ServiceCategory {
  FLOORING = 'flooring',
  COUNTERTOPS = 'countertops',
  WALLS = 'walls',
  STAIRS = 'stairs',
  BATHROOMS = 'bathrooms'
}

export interface MarbleDesign {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  priceMultiplier: number; // multiplier for base price
  color: string;
  pattern: string;
  origin: string;
}

export interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
  premium: boolean; // for peak hours
}

export interface BookingRequest {
  serviceId: string;
  designId: string;
  area: number; // square feet
  timeSlotId: string;
  address: string;
  customerName: string;
  phone: string;
  email: string;
  specialInstructions?: string;
}

export interface PriceBreakdown {
  baseLabor: number;
  designMultiplier: number;
  areaTotal: number;
  extras: PriceExtra[];
  premiumTime: number;
  total: number;
}

export interface PriceExtra {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface Booking {
  id: string;
  request: BookingRequest;
  priceBreakdown: PriceBreakdown;
  status: BookingStatus;
  createdAt: Date;
  scheduledDate: Date;
  estimatedDuration: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bookings: Booking[];
  preferences: {
    preferredDesigns: string[];
    preferredTimeSlots: string[];
  };
}

export interface Professional {
  id: string;
  name: string;
  rating: number;
  experience: number; // years
  specialties: ServiceCategory[];
  image: string;
  bio: string;
  completedJobs: number;
}

// Form types
export interface ServiceCalculatorForm {
  serviceType: string;
  area: number;
  designType: string;
}

export interface BookingForm {
  service: Service;
  design: MarbleDesign;
  area: number;
  timeSlot: TimeSlot;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  extras: string[];
  specialInstructions: string;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  serviceType: string;
  date: Date;
  verified: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingResponse extends ApiResponse<Booking> {
  bookingId?: string;
  estimatedCompletion?: Date;
}