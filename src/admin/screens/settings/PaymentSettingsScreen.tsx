/*
 * =================================================================
 * == FILE: src/admin/screens/settings/PaymentSettingsScreen.tsx
 * =================================================================
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { getPaymentSettingsApi, updatePaymentSettingsApi } from '../../api/payment';
import { PaymentSettings } from '@/shared/types';
import { colors } from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import PaymentSettingsForm from '../../components/settings/PaymentSettingsForm';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import { parseApiError } from '@/shared/utils/errorHandler';

const PaymentSettingsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<PaymentSettings>>({});
    const [originalSettings, setOriginalSettings] = useState<any>({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getPaymentSettingsApi();
                if (response.data && response.data.status === 1 && response.data.data.length > 0) {
                    const settings = response.data.data[0];
                    setOriginalSettings(settings);
                    // Extract payment settings if they exist
                    const paymentData = {
                        stripe: settings.stripe || { enabled: false, apiKey: '', apiSecret: '' },
                        paypal: settings.paypal || { enabled: false, clientId: '', clientSecret: '' }
                    };
                    setForm(paymentData);
                }
            } catch (err) {
                setError(parseApiError(err));
            } finally {
                setPageLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (gateway: keyof PaymentSettings, field: string, value: string | boolean) => {
        setForm(prev => ({
            ...prev,
            [gateway]: {
                ...prev[gateway],
                [field]: value
            }
        }));
    };

    const handleSaveSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            // Merge our payment form data with the original settings object
            const payload = { ...originalSettings, ...form };
            const response = await updatePaymentSettingsApi(payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Payment settings saved successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to save settings.');
            }
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return <LoadingSpinner />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <PaymentSettingsForm form={form} onInputChange={handleInputChange} />
                {error && <ErrorText message={error} />}
                <AppButton title="Save Payment Settings" onPress={handleSaveSettings} loading={loading} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
});

export default PaymentSettingsScreen;
