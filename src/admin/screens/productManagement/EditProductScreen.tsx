/*
 * =================================================================
 * == FILE: src/admin/screens/productManagement/EditProductScreen.tsx
 * =================================================================
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { getProductDetailApi, updateProductApi } from '../../api/product';
import { Product, UpdateProduct } from '@/shared/types';
import { colors } from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import ProductDetailForm from '../../components/productManagement/ProductDetailForm';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import { parseApiError } from '@/shared/utils/errorHandler';

type ParamList = {
    EditProduct: {
        productId: number;
    };
};

const EditProductScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'EditProduct'>>();
    const { productId } = route.params;

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<UpdateProduct>>({});

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await getProductDetailApi(productId);
                if (response.data && response.data.status === 1) {
                    const productData: Product = response.data.data;
                    setForm({
                        productName: productData.name,
                        productDescription: productData.productDescription,
                        sku: productData.sku,
                        upc: productData.upc,
                        hsn: productData.hsn,
                        price: parseFloat(productData.price),
                        quantity: productData.quantity,
                        categoryId: productData.Category?.map(c => c.categoryId).join(',') || '',
                        image: '', // Image is not sent back, leave blank for update
                        status: productData.isActive,
                        sortOrder: productData.sortOrder,
                        dateAvailable: productData.dateAvailable.split('T')[0],
                    });
                } else {
                    throw new Error('Failed to load product details');
                }
            } catch (e: any) {
                setError(parseApiError(e));
            } finally {
                setPageLoading(false);
            }
        };
        loadInitialData();
    }, [productId]);

    const handleInputChange = (name: keyof UpdateProduct, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const payload = { ...form, productId } as UpdateProduct;
            const response = await updateProductApi(productId, payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Product updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to update product.');
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
                <ProductDetailForm form={form} onInputChange={handleInputChange} />
                {error && <ErrorText message={error} />}
                <AppButton title="Update Product" onPress={handleUpdateProduct} loading={loading} />
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

export default EditProductScreen;
