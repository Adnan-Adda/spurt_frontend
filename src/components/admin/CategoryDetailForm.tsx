/*
 * =================================================================
 * == FILE: src/components/admin/CategoryDetailForm.tsx
 * =================================================================
 *
 * A reusable form for creating and editing category details.
 */
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { NewCategory } from '../../types';
import AppTextInput from '../common/AppTextInput';
import { colors } from '../../styles/colors';
import AppButton from '../common/AppButton';

interface CategoryDetailFormProps {
    form: Partial<NewCategory>;
    onInputChange: (name: keyof NewCategory, value: string | number | any) => void;
}

const CategoryDetailForm: React.FC<CategoryDetailFormProps> = ({ form, onInputChange }) => {
    return (
        <View>
            <AppTextInput
                label="Category Name"
                value={form.name || ''}
                onChangeText={(val) => onInputChange('name', val)}
                placeholder="Enter category name"
            />
            <AppTextInput
                label="Sort Order"
                value={form.sortOrder?.toString() || '0'}
                onChangeText={(val) => onInputChange('sortOrder', parseInt(val, 10) || 0)}
                placeholder="Enter sort order"
                keyboardType="numeric"
            />
            {/* We will add a parent category selector here later */}
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Active Status</Text>
                <Switch
                    trackColor={{ false: '#767577', true: colors.primary }}
                    thumbColor={form.status === 1 ? '#f4f3f4' : '#f4f3f4'}
                    onValueChange={(isActive) => onInputChange('status', isActive ? 1 : 0)}
                    value={form.status === 1}
                />
            </View>
            <Text style={styles.imageLabel}>Category Image</Text>
            <AppButton title="Select Image" onPress={() => alert('Image picker not yet implemented.')} />
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
    imageLabel: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 8,
        fontWeight: '600',
        marginTop: 10,
    }
});

export default CategoryDetailForm;
