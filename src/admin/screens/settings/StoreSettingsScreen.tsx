/*
 * =================================================================
 * == FILE: src/admin/screens/settings/StoreSettingsScreen.tsx
 * =================================================================
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSettingsApi, createSettingsApi } from '../../api/settings';
import { StoreSettings } from '@/shared/types';
import { colors } from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import StoreSettingsForm from '../../components/settings/StoreSettingsForm';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import { parseApiError } from '@/shared/utils/errorHandler';

const StoreSettingsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<StoreSettings>>({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getSettingsApi();
                if (response.data && response.data.status === 1 && response.data.data.length > 0) {
                    // The API returns a list, so we take the first item
                    setForm(response.data.data[0]);
                } else {
                    // If no settings exist, initialize with empty form
                    console.log("No existing settings found, initializing new form.");
                }
            } catch (err) {
                setError(parseApiError(err));
            } finally {
                setPageLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (name: keyof StoreSettings, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await createSettingsApi(form);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Settings saved successfully!');
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
                <StoreSettingsForm form={form} onInputChange={handleInputChange} />
                {error && <ErrorText message={error} />}
                <AppButton title="Save Settings" onPress={handleSaveSettings} loading={loading} />
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

export default StoreSettingsScreen;
