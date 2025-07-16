/*
 * =================================================================
 * == FILE: src/types.ts
 * =================================================================
 *
 * This file contains TypeScript type definitions used across the app.
 * Create a new file for this in the src/ directory.
 */
export interface LoginCredentials {
    username: string; // The API expects 'username' for the email
    password: string;
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    // ToDo remove password from user list when fetching it
    usergroup: { // <-- ADDED
        name: string;
        groupId: number;
        createdBy: string;
    };
    // Add any other user properties you need from the API response
}

// Type for the dashboard counts API response
export interface DashboardCounts {
    productCount: number;
    categoryCount: number;
    customerCount: number;
    salesCount: number;
    [key: string]: number; // For dynamic access
}

// Definition for a user role/group
export interface Role {
    groupId: number;
    name: string;
    isActive: number;
}

// Definition for the new role payload
export interface NewRole {
    name: string;
    status: number; // API expects 'status' (1 for active, 0 for inactive)
}

// Definition for the role update payload
export interface UpdateRole extends NewRole {}

// Definition for the new user payload
export interface NewUser {
    firstName: string;
    lastName:string;
    email: string;
    username: string;
    password?: string;
    userGroupId: number;
}

// Definition for the user update payload
export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userGroupId: number;
    password?: string; // Password is optional when updating
}

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
