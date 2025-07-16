// Definition for a product category
export interface Category {
    categoryId: number;
    name: string;
    image: string;
    imagePath: string;
    parentInt: number;
    sortOrder: number;
    isActive: number;
}

// Definition for the new category payload
export interface NewCategory {
    name: string;
    parentInt: number;
    sortOrder: number;
    status: number;
    image?: string; // For file upload
}

// Definition for the category update payload
export interface UpdateCategory extends NewCategory {
    categoryId: number;
}