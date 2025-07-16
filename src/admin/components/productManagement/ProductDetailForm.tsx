/*
 * =================================================================
 * == FILE: src/components/admin/ProductDetailForm.tsx
 * =================================================================
 *
 * A reusable form for creating and editing product details.
 */

import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {NewProduct} from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import {colors} from '@/shared/styles/colors';

interface ProductDetailFormProps {
    form: Partial<NewProduct>;
    onInputChange: (name: keyof NewProduct, value: string | number) => void;
}

const ProductDetailForm: React.FC<ProductDetailFormProps> = ({form, onInputChange}) => {
    return (
        <View>
            <AppTextInput
                label="Product Name"
                value={form.productName || ''}
                onChangeText={(val) => onInputChange('productName', val)}
                placeholder="Enter product name"
            />
            <AppTextInput
                label="Product Description"
                value={form.productDescription || ''}
                onChangeText={(val) => onInputChange('productDescription', val)}
                placeholder="Enter a detailed description"
                multiline
                numberOfLines={4}
            />
            <AppTextInput
                label="SKU (Stock Keeping Unit)"
                value={form.sku || ''}
                onChangeText={(val) => onInputChange('sku', val)}
                placeholder="Enter SKU"
            />
            <AppTextInput
                label="UPC (Universal Product Code)"
                value={form.upc || ''}
                onChangeText={(val) => onInputChange('upc', val)}
                placeholder="Enter UPC"
            />
            <AppTextInput
                label="HSN (Harmonized System of Nomenclature)"
                value={form.hsn || ''}
                onChangeText={(val) => onInputChange('hsn', val)}
                placeholder="Enter HSN Code"
            />
            <AppTextInput
                label="Price"
                value={form.price?.toString() || ''}
                onChangeText={(val) => onInputChange('price', parseFloat(val) || 0)}
                placeholder="Enter price"
                keyboardType="numeric"
            />
            <AppTextInput
                label="Quantity"
                value={form.quantity?.toString() || ''}
                onChangeText={(val) => onInputChange('quantity', parseInt(val, 10) || 0)}
                placeholder="Enter stock quantity"
                keyboardType="numeric"
            />
            <AppTextInput
                label="Sort Order"
                value={form.sortOrder?.toString() || ''}
                onChangeText={(val) => onInputChange('sortOrder', parseInt(val, 10) || 0)}
                placeholder="Enter sort order"
                keyboardType="numeric"
            />
            <AppTextInput
                label="Category IDs"
                value={form.categoryId || ''}
                onChangeText={(val) => onInputChange('categoryId', val)}
                placeholder="e.g., 1,5,12"
            />
            <AppTextInput
                label="Date Available"
                value={form.dateAvailable || ''}
                onChangeText={(val) => onInputChange('dateAvailable', val)}
                placeholder="YYYY-MM-DD"
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Active Status</Text>
                <Switch
                    trackColor={{false: '#767577', true: colors.primary}}
                    thumbColor={form.status === 1 ? '#f4f3f4' : '#f4f3f4'}
                    onValueChange={(isActive) => onInputChange('status', isActive ? 1 : 0)}
                    value={form.status === 1}
                />
            </View>
            <AppTextInput
                label="Image (Base64)"
                value={form.image || ''}
                onChangeText={(val) => onInputChange('image', val)}
                placeholder="Paste base64 encoded image string"
                multiline
            />
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

export default ProductDetailForm;