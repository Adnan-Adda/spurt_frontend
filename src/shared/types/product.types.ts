// Definition for a single product
export interface Product {
    productId: number;
    name: string;
    sku: string;
    price: string;
    quantity: number;
    isActive: number; // 1 for active, 0 for inactive
    imagePath: string;
    productImage: {
        image: string;
        containerName: string;
    }[];
    // Add other fields from the API response as needed
}


export interface NewProduct {
    productName: string;
    productDescription: string;
    sku: string;
    upc: string;
    hsn: string;
    image: string; // The API expects a base64 encoded string
    categoryId: string; // API expects a string of comma-separated IDs
    price: number;
    quantity: number;
    dateAvailable: string; // Format: YYYY-MM-DD
    status: number; // 1 for active, 0 for inactive
    sortOrder: number;
}
