// Category and SubCategory Types for the Local Service Finder Project

export interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  category_id: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}
