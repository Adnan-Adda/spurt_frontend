/*
 * =================================================================
 * == FILE: src/shared/types/order.types.ts
 * =================================================================
 *
 * Defines the TypeScript interfaces for Orders based on the API doc.
 */

export interface Order {
    orderId: number;
    orderPrefixId: string;
    shippingFirstname: string;
    total: string;
    createdDate: string;
    currencyCode: string;
    currencySymbolLeft: string;
    currencySymbolRight: string;
    orderStatus: {
        name: string;
        colorCode: string;
    };
}
