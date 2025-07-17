/*
 * =================================================================
 * == FILE: src/shared/types/banner.types.ts
 * =================================================================
 *
 * Defines the TypeScript interfaces for Banners based on the API doc.
 */

// This represents the detailed image object returned by the GET API
export interface BannerImageDetail {
    id: number;
    imageName: string;
    imagePath: string;
    isPrimary: number;
    bannerId: number;
}

// This represents the main Banner object returned by the GET API
export interface Banner {
    bannerId: number;
    title: string;
    content: string;
    link: string;
    position: number;
    isActive: number;
    bannerImages: BannerImageDetail[]; // The API returns this array
}

// This represents the simplified image object required for POST/PUT payloads
export interface NewBannerImage {
    image: string; // The base64 string
    containerName: string;
    isPrimary: number;
}

// This is the payload for creating a new banner
export interface NewBanner {
    title: string;
    content: string;
    link: string;
    position: number;
    status: number;
    bannerImage: NewBannerImage[]; // The API expects this array for creation
}

// This is the payload for updating a banner
export interface UpdateBanner extends NewBanner {
    bannerId: number;
}