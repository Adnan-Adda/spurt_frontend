/*
 * =================================================================
 * == FILE: src/shared/types/product.types.ts
 * =================================================================
 */


export interface Product {
    productId: number;
    name: string;
    sku: string;
    price: string;
    quantity: number;
    isActive: number;
    imagePath: string;
    productImage: {
        image: string;
        containerName: string;
    }[];
    // Add other fields as needed
    productDescription: string;
    upc: string;
    hsn: string;
    dateAvailable: string;
    sortOrder: number;
    Category: { categoryId: number; name: string }[];
}

export interface NewProduct {
    productName: string;
    productDescription: string;
    sku: string;
    upc: string;
    hsn: string;
    image: string;
    categoryId: string;
    price: number;
    quantity: number;
    dateAvailable: string;
    status: number;
    sortOrder: number;
}

export interface UpdateProduct extends NewProduct {
    productId: number;
}
