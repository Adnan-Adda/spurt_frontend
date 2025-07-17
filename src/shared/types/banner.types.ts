/*
 * =================================================================
 * == FILE: src/shared/types/banner.types.ts
 * =================================================================
 *
 * Defines the TypeScript interfaces for Banners based on the API doc.
 */

export interface Banner {
    bannerId: number;
    title: string;
    content: string;
    image: string;
    imagePath: string;
    link: string;
    position: number;
    isActive: number;
}

// Interface for a single image object within the banner
export interface BannerImage {
    image: string;
    containerName: string;
    isPrimary: number;
}

export interface NewBanner {
    title: string;
    content: string;
    link: string;
    position: number;
    bannerImage: BannerImage[]; // API expects a base64 encoded string
    status: number; // 1 for active, 0 for inactive
}
