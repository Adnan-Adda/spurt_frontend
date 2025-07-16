/*
 * =================================================================
 * == FILE: src/screens/admin/EditCategoryScreen.tsx
 * =================================================================
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { updateCategoryApi } from '../../api/category';
import { Category, UpdateCategory } from '@/shared/types';
import { colors } from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import CategoryDetailForm from '../../components/productManagement/CategoryDetailForm';
import { parseApiError } from '@/shared/utils/errorHandler';

type ParamList = {
    EditCategory: {
        category: Category;
    };
};

const EditCategoryScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'EditCategory'>>();
    const { category } = route.params;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<UpdateCategory>>({});

    useEffect(() => {
        setForm({
            name: category.name,
            parentInt: category.parentInt,
            sortOrder: category.sortOrder,
            status: category.isActive,
            image: category.image,
        });
    }, [category]);

    const handleInputChange = (name: keyof UpdateCategory, value: string | number | any) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateCategory = async () => {
        if (!form.name) {
            setError('Category name is required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const payload: UpdateCategory = {
                categoryId: category.categoryId,
                name: form.name!,
                parentInt: form.parentInt || 0,
                sortOrder: form.sortOrder!,
                status: form.status!,
            };

            // Only add the image key if it's not empty.
            if (form.image && form.image.trim() !== '') {
                payload.image = form.image;
            }

            const response = await updateCategoryApi(category.categoryId, payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Category updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to update category.');
            }
        } catch (err: any) {
            const errorMessage = parseApiError(err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <CategoryDetailForm form={form} onInputChange={handleInputChange} />
                {error && <ErrorText message={error} />}
                <AppButton title="Update Category" onPress={handleUpdateCategory} loading={loading} />
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

export default EditCategoryScreen;
