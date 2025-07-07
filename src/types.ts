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
    // Add any other user properties you need from the API response
}

// NEW: Type for the dashboard counts API response
export interface DashboardCounts {
    productCount: number;
    categoryCount: number;
    customerCount: number;
    salesCount: number;
    [key: string]: number; // For dynamic access
}


// NEW: Definition for a single product
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


// NEW: Definition for a user role/group
export interface Role {
    groupId: number;
    name: string;
    isActive: number;
}

// NEW: Definition for the new user payload
export interface NewUser {
    firstName: string;
    lastName:string;
    email: string;
    username: string;
    password?: string;
    userGroupId: number;
}