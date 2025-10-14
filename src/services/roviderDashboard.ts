// types/providerDashboard.ts

// Minimal user info for booking
export interface DashboardUser {
    id: number;
    firstName: string;
    lastName?: string | null;
    email: string;
    phone?: string | null;
    avatar?: string | null;
}

// Package info for booking
export interface DashboardPackage {
    id: number;
    name: string;
    description?: string;
    price: string;
}

// Review info for booking
export interface DashboardReview {
    id: number;
    rating: number;
    comment?: string;
    createdAt: string;
    user: DashboardUser;
}

// Individual service request (booking) with user/package/reviews
export interface ServiceRequestDashboard {
    id: number;
    userId: number;
    serviceProviderId: number;
    packageId: number;
    urgentLevel: number;
    description?: string;
    address: string;
    contactNumber: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: DashboardUser;
    package?: DashboardPackage;
    reviews?: DashboardReview[];
}

// Stats summary for provider
export interface ProviderStats {
    total_booking: number;
    total_earning: number;
    avg_rating: number;
    completion_rate: number;
}

// Full API response for Provider Dashboard
export interface ProviderDashboardResponse {
    success: boolean;
    message: string;
    data: {
        data: {
            serviceRequests: ServiceRequestDashboard[];
            stats: ProviderStats;


        }
    };
}
