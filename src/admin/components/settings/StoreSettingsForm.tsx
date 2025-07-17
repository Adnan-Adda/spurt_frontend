/*
 * =================================================================
 * == FILE: src/admin/components/settings/StoreSettingsForm.tsx
 * =================================================================
 */
import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {StoreSettings} from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import {colors} from '@/shared/styles/colors';

interface StoreSettingsFormProps {
    form: Partial<StoreSettings>;
    onInputChange: (name: keyof StoreSettings, value: string | number) => void;
}

const StoreSettingsForm: React.FC<StoreSettingsFormProps> = ({form, onInputChange}) => {
    return (
        <View>
            <AppTextInput
                label="Store Name"
                value={form.storeName || ''}
                onChangeText={(val) => onInputChange('storeName', val)}
            />
            <AppTextInput
                label="Store Owner"
                value={form.storeOwner || ''}
                onChangeText={(val) => onInputChange('storeOwner', val)}
            />
            <AppTextInput
                label="Store Email"
                value={form.storeEmail || ''}
                onChangeText={(val) => onInputChange('storeEmail', val)}
                keyboardType="email-address"
            />
            <AppTextInput
                label="Store Telephone"
                value={form.storeTelephone || ''}
                onChangeText={(val) => onInputChange('storeTelephone', val)}
                keyboardType="phone-pad"
            />
            <AppTextInput
                label="Store Address"
                value={form.storeAddress || ''}
                onChangeText={(val) => onInputChange('storeAddress', val)}
                multiline
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Maintenance Mode</Text>
                <Switch
                    trackColor={{false: '#767577', true: colors.primary}}
                    thumbColor={form.maintenanceMode === 1 ? '#f4f3f4' : '#f4f3f4'}
                    onValueChange={(isActive) => onInputChange('maintenanceMode', isActive ? 1 : 0)}
                    value={form.maintenanceMode === 1}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: colors.text,
    },
});

export default StoreSettingsForm;
