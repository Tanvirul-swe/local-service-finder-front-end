import { ProviderResponse } from "@/types/provider";
import { ApiService } from "./api";
import { Category, CategoryResponse } from "./category";
import { Provider } from "react";

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
    

}
