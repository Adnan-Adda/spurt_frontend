/*
 * =================================================================
 * == FILE: src/types.ts
 * =================================================================
 *
 * This file contains TypeScript type definitions used across the app.
 */

// Type for the dashboard counts API response
export interface DashboardCounts {
    productCount: number;
    categoryCount: number;
    customerCount: number;
    salesCount: number;

    [key: string]: number; // For dynamic access
}

/**
 * A generic interface for a standard paginated API response.
 * T represents the type of the data items in the list.
 */
export interface PaginatedResponse<T> {
    status: number;
    message: string;
    data: T[];
    count: number;
}

/**
 * A generic interface for a standard successful API response.
 * This is the ideal structure our services will return to the UI.
 * T represents the type of the main data payload.
 */
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}