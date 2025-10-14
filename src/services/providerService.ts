import { PackagesResponse, ProviderResponse } from "@/types/provider";
import { ApiService } from "./api";
import { Category, CategoryResponse } from "./category";
import { Provider } from "react";
import { BookingRequest, BookingResponse } from "@/types/booking";
import { ProviderDashboardResponse } from "./roviderDashboard";

export class ProviderService {
    // ✅ Fetch provider profile (with packages, portfolios, etc.)
    static async getProviderById(id: number): Promise<ProviderResponse> {
        try {
            const response = await ApiService.get<ProviderResponse>(`/users/${id}`);
            return response;
        } catch (error) {
            console.error("Failed to fetch provider:", error);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong",
                data: null,
            };
        }
    }

    // Top rated providers
    static async getTopRatedProviders(limit: number = 5): Promise<{ success: boolean; message: string; data: ProviderResponse }> {
        try {
            const response = await ApiService.get<{ success: boolean; message: string; data: ProviderResponse }>(`/users/top-rated?limit=${limit}`);
            return response;
        } catch (error) {
            console.error("Failed to fetch top-rated providers:", error);
            return { success: false, message: "Failed to fetch top-rated providers", data: null };
        }
    }

    // ✅ Fetch provider’s packages
    static async getPackages(id: number) {
        try {
            const response = await ApiService.get(`/users/${id}/packages`);
            return response;
        } catch (error) {
            console.error("Failed to fetch packages:", error);
            return { success: false, message: "Failed to fetch packages", data: [] };
        }
    }

    // ✅ Fetch provider’s portfolio
    static async getPortfolio(id: number) {
        try {
            const response = await ApiService.get(`/users/${id}/portfolios`);
            return response;
        } catch (error) {
            console.error("Failed to fetch portfolio:", error);
            return { success: false, message: "Failed to fetch portfolio", data: [] };
        }
    }

    // ✅ Add new package
    static async addPackage(providerId: number, data: any) {
        try {
            const response = await ApiService.post(`/users/${providerId}/packages`, data);
            return response;
        } catch (error) {
            console.error("Failed to add package:", error);
            return { success: false, message: "Could not add package" };
        }
    }

    // ✅ Add new portfolio item
    static async addPortfolioItem(providerId: number, data: any) {
        try {
            const response = await ApiService.post(`/users/${providerId}/portfolios`, data);
            return response;
        } catch (error) {
            console.error("Failed to add portfolio item:", error);
            return { success: false, message: "Could not add portfolio item" };
        }
    }

    // ✅ Update provider profile (bio, address, phone, etc.)
    static async updateProfile(providerId: number, data: any) {
        try {
            const response = await ApiService.patch(`/users/${providerId}`, data);
            return response;
        } catch (error) {
            console.error("Failed to update provider profile:", error);
            return { success: false, message: "Update failed" };
        }
    }


    //========Category Related Services========//
    // ✅ Fetch all categories with subcategories
    static async getAllCategories(): Promise<CategoryResponse> {
        try {
            const response = await ApiService.get<CategoryResponse>(`/service/categories`);
            return response;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            return { success: false, message: "Failed to fetch categories", data: [] };
        }
    }


    // ✅ Fetch all packages in a specific user_id
    static async getPackagesByUserId(userId: number) {
        try {
            const response = await ApiService.get<PackagesResponse>(`/service/packages/${userId}`);
            return response;
        } catch (error) {
            console.error("Failed to fetch packages by user ID:", error);
            return { success: false, message: "Failed to fetch packages", data: [] };
        }
    }


    // /booking/create a new service request
    static async createServiceRequest(data: BookingRequest): Promise<BookingResponse> {
        try {
            console.log("Creating service request with data:", data);
            const response = await ApiService.post<BookingResponse>(`/booking/create`, data);
            return response;
        } catch (error) {
            console.error("Failed to create service request:", error);
            return { success: false, message: "Could not create service request" };
        }
    }

    
//getProviderDashboard
    static async getProviderDashboard(providerId: number) {
        try {
            const response = await ApiService.get<ProviderDashboardResponse>(`/booking/provider/${providerId}`);
            return response;
        } catch (error) {
            console.error("Failed to fetch provider dashboard:", error);
            return { success: false, message: "Failed to fetch provider dashboard", data: null };
        }
    }  
    
    // Update Servicre Request Status
    static async updateServiceRequestStatus(requestId: number, status: string) {
        try {
            const response = await ApiService.patch(`/booking/status/${requestId}`, { status: status });
            return response;
        } catch (error) {
            console.error("Failed to update service request status:", error);
            return { success: false, message: "Could not update service request status" };
        }
    }

}
