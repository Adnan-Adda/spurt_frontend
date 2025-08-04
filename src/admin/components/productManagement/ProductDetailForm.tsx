/*
 * =================================================================
 * == FILE: src/components/admin/ProductDetailForm.tsx
 * =================================================================
 *
 * A reusable form for creating and editing product details.
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Category, NewProduct, Product} from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import {colors} from '@/shared/styles/colors';
import {useFormik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {Switch} from 'react-native-paper';
import AppButton from "@/shared/components/common/AppButton";
import AccordionCategorySelect from "@/shared/components/common/AccordionCategorySelect";
// @ts-ignore
import ImageUploadManager from "@/shared/components/common/ImageUploadManager";


interface ProductDetailFormProps {
    initialValues?: Partial<NewProduct>;
    onSubmit: (values: any, helpers: FormikHelpers<any>) => Promise<void>;
    isEditMode: boolean;
}

// Define the validation schema using Yup
const ProductSchema = Yup.object().shape({
    productName: Yup.string().required('Product name is required').nonNullable(),
    categoryId: Yup.number().required('Category is required').nonNullable(),
    price: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
    status: Yup.boolean(),
});

const ProductDetailForm: React.FC<ProductDetailFormProps> = ({initialValues, onSubmit, isEditMode}) => {
    const formik = useFormik({
        initialValues: {
            productName: initialValues?.productName || '',
            categoryId: initialValues?.categoryId || '',
            quantity: initialValues?.quantity || 0,
            price: initialValues?.price || 0,
            image: initialValues?.image || [],
            status: isEditMode ? Boolean(initialValues?.status) : true,
            // TODO: Add all other fields from Product.json
        },

        validationSchema: ProductSchema,

        onSubmit: async (values, helpers) => {
            // The parent component's onSubmit function is called here
            await onSubmit(values, helpers);
        },
        enableReinitialize: true, // This is important for edit mode to populate form when initialValues arrive
    });

    return (
        <ScrollView style={styles.container}>

            <View style={styles.form}>
                <AppTextInput
                    label="Product Name *"
                    value={formik.values.productName}
                    onChangeText={formik.handleChange('productName')}
                    onBlur={formik.handleBlur('productName')}
                    error={formik.touched.productName ? formik.errors.productName : ''}
                    touched={formik.touched.productName}
                />

                <ImageUploadManager
                    initialImages={formik.values.image}
                    onImagesChange={(newImages: any) => {
                        formik.setFieldValue('image', newImages);
                    }}
                />
                <AccordionCategorySelect
                    onValueChange={(value) => formik.setFieldValue('categoryId', [value])}
                    selectedValue={Number(formik.values.categoryId)}
                    label={"Category *"}
                    error={formik.touched.categoryId ? formik.errors.categoryId : 'mmm'}
                    touched={formik.touched.categoryId}
                />

                <AppTextInput
                    label="Quantity *"
                    value={String(formik.values.quantity)}
                    onChangeText={formik.handleChange('quantity')}
                    onBlur={formik.handleBlur('quantity')}
                    error={formik.touched.quantity ? formik.errors.quantity : ''}
                    touched={formik.touched.quantity}
                    keyboardType="numeric"
                />

                <AppTextInput
                    label="Price *"
                    value={String(formik.values.price)}
                    onChangeText={formik.handleChange('price')}
                    onBlur={formik.handleBlur('price')}
                    error={formik.touched.price ? formik.errors.price : ''}
                    touched={formik.touched.price}
                    keyboardType="numeric"
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Status</Text>
                    <Switch
                        value={formik.values.status}
                        onValueChange={(value) => {
                            formik.setFieldValue('status', value)
                        }}
                        color={colors.primary}
                    />
                </View>

                <AppButton
                    title={isEditMode ? 'Save Changes' : 'Create Product'}
                    onPress={() => formik.handleSubmit()}
                    loading={formik.isSubmitting}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    form: {
        padding: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        color: colors.darkGray,
    },
});

export default ProductDetailForm;