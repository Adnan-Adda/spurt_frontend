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

// NEW: Definition for the new role payload
export interface NewRole {
    name: string;
    status: number; // API expects 'status' (1 for active, 0 for inactive)
}

// NEW: Definition for the role update payload
export interface UpdateRole extends NewRole {}

// NEW: Definition for the new user payload
export interface NewUser {
    firstName: string;
    lastName:string;
    email: string;
    username: string;
    password?: string;
    userGroupId: number;
}

// NEW: Definition for the user update payload
export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userGroupId: number;
    password?: string; // Password is optional when updating
}

// NEW: Definition for a product category
export interface Category {
    categoryId: number;
    name: string;
    image: string;
    imagePath: string;
    parentInt: number;
    sortOrder: number;
    isActive: number;
}