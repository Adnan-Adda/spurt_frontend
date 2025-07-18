/*
 * =================================================================
 * == FILE: src/shared/types/payment.types.ts
 * =================================================================
 *
 * Defines the TypeScript interfaces for Payment Gateway settings.
 */

export interface PaymentGateway {
    name: string;
    // Add other common fields if necessary
}

export interface PaymentSettings {
    // Example for Stripe
    stripe: {
        enabled: boolean;
        apiKey: string;
        apiSecret: string;
    };
    // Example for PayPal
    paypal: {
        enabled: boolean;
        clientId: string;
        clientSecret: string;
    };
    // Add other gateways as needed
}
