/*
 * =================================================================
 * == FILE: src/admin/components/settings/PaymentSettingsForm.tsx
 * =================================================================
 */
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { PaymentSettings } from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import { colors } from '@/shared/styles/colors';

interface PaymentSettingsFormProps {
    form: Partial<PaymentSettings>;
    onInputChange: (gateway: keyof PaymentSettings, field: string, value: string | boolean) => void;
}

const PaymentSettingsForm: React.FC<PaymentSettingsFormProps> = ({ form, onInputChange }) => {
    return (
        <View>
            {/* Stripe Settings */}
            <Text style={styles.gatewayTitle}>Stripe</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Enable Stripe</Text>
                <Switch
                    value={form.stripe?.enabled || false}
                    onValueChange={(val) => onInputChange('stripe', 'enabled', val)}
                />
            </View>
            <AppTextInput
                label="Stripe API Key"
                value={form.stripe?.apiKey || ''}
                onChangeText={(val) => onInputChange('stripe', 'apiKey', val)}
            />
            <AppTextInput
                label="Stripe API Secret"
                value={form.stripe?.apiSecret || ''}
                onChangeText={(val) => onInputChange('stripe', 'apiSecret', val)}
                secureTextEntry
            />

            <View style={styles.separator} />

            {/* PayPal Settings */}
            <Text style={styles.gatewayTitle}>PayPal</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Enable PayPal</Text>
                <Switch
                    value={form.paypal?.enabled || false}
                    onValueChange={(val) => onInputChange('paypal', 'enabled', val)}
                />
            </View>
            <AppTextInput
                label="PayPal Client ID"
                value={form.paypal?.clientId || ''}
                onChangeText={(val) => onInputChange('paypal', 'clientId', val)}
            />
            <AppTextInput
                label="PayPal Client Secret"
                value={form.paypal?.clientSecret || ''}
                onChangeText={(val) => onInputChange('paypal', 'clientSecret', val)}
                secureTextEntry
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gatewayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: colors.text,
    },
    separator: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 20,
    }
});

export default PaymentSettingsForm;
