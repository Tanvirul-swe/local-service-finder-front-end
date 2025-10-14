// types/provider.ts

// Basic provider info
export interface Provider {
  id: number;
  firstName: string;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  about?: string | null;
  signUpType: 'EMAIL' | 'GOOGLE' | 'FACEBOOK';
  status: 'APPROVE' | 'PENDING' | 'BLOCKED';
  activeStatus: boolean;
  createdAt: string;
  updatedAt: string;

  responseTime?: string | null; // e.g., "24 hours"
  onTimeRate?: string | null;   // e.g., "95%"
  jobsCompleted?: number | null;
  rating?: number | null;       // e.g., 4.8
  reviewsCount?: number | null; // e.g., 120
  repeatClients?: number | null; // e.g., 85
  ongoingServicesCount?: number | null; // e.g., 3
  

  packages?: Package[];
  portfolios?: Portfolio[];
  certifications?: Certification[];
  requestModifications?: RequestModification[];
  serviceRequestsAsProvider?: ServiceRequest[];
  serviceRequestsAsCustomer?: ServiceRequest[];
  category?: Category; // singular, matches API
  receivedReviews?: Review[]; // reviews for this provider
  total_rating_count?: number;
  avg_rating?: number;
}

// Package type
export interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

// Portfolio type
export interface Portfolio {
  id: number;
  userId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

// Certification type
export interface Certification {
  id: number;
  userId: number;
  title: string;
  issuer: string;
  earnedOn: string;
  expiresOn: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

// Request Modification (placeholder)
export interface RequestModification {
  // fill with actual fields
}

// Service request
export interface ServiceRequest {
  id: number;
  userId: number;
  serviceProviderId: number;
  packageId: number;
  urgentLevel: number;
  description: string;
  address: string;
  contactNumber: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  service_provider_id: number;
  package_id: number;
  user_id: number;
  package?: Package; // nested package object
  serviceProvider: Provider; // nested provider object
}

// Review type
export interface Review {
  id: number;
  userId: number;
  providerId: number;
  serviceRequestId: number;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: Reviewer; // nested user object
  serviceRequest?: ServiceRequest; // optional if you include it in API
}

// Reviewer type
export interface Reviewer {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
}

// API Response type for a single provider
export interface ProviderResponse {
  success: boolean;
  message: string;
  data?: Provider;
}

export interface PackagesResponse {
  success: boolean;
  message: string;
  data: Package[];
}

// Category and Subcategory types
export interface Category {
  id: number;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  subCategories?: Subcategory[]; // matches backend API
}

export interface Subcategory {
  id: number;
  categoryId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  category_id: number;
}
