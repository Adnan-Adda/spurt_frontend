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