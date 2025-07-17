/*
 * =================================================================
 * == FILE: src/shared/types/settings.types.ts
 * =================================================================
 *
 * Defines the TypeScript interfaces for the main Store Settings.
 */

export interface StoreSettings {
    settingsId: number;
    siteUrl: string;
    metaTagTitle: string;
    metaTagDescription: string;
    metaTagKeyword: string;
    storeName: string;
    storeOwner: string;
    storeAddress: string;
    countryId: number;
    zoneId: number;
    storeEmail: string;
    storeTelephone: string;
    storeFax: string;
    storeLogo: string;
    storeLogoPath: string;
    maintenanceMode: number;
    storeLanguageName: string;
    storeCurrencyId: number;
    invoicePrefix: string;
    orderStatus: number;
    itemsPerPage: number;
    // Add other fields from the API as needed
}