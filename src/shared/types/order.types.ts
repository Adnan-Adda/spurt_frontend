/*
 * =================================================================
 * == FILE: src/shared/types/order.types.ts
 * =================================================================
 *
 * Defines the TypeScript interfaces for Orders based on the API doc.
 */
export interface OrderStatus {
    orderStatusId: number;
    name: string;
    isActive: number;
    colorCode: string;
}

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

// Represents a single product within an order
export interface OrderProduct {
    orderProductId: number;
    name: string;
    quantity: number;
    total: string;
    productPrice: string;
    orderStatus: {
        name: string;
        colorCode: string;
    };
}

// Represents the full details of an order
export interface OrderDetail {
    orderId: number;
    orderPrefixId: string;
    shippingFirstname: string;
    shippingLastname: string;
    shippingAddress1: string;
    shippingAddress2: string;
    shippingCity: string;
    shippingZone: string;
    shippingCountry: string;
    shippingPostcode: string;
    telephone: string;
    email: string;
    total: string;
    createdDate: string;
    currencyCode: string;
    currencySymbolLeft: string;
    currencySymbolRight: string;
    orderStatus: {
        name: string;
        colorCode: string;
    };
    productList: OrderProduct[];
}

// This is the simplified Order type for the list view
export interface Order extends Omit<OrderDetail, 'productList' | 'shippingLastname' | 'shippingAddress1' | 'shippingAddress2' | 'shippingCity' | 'shippingZone' | 'shippingCountry' | 'shippingPostcode' | 'telephone' | 'email'> {
}
