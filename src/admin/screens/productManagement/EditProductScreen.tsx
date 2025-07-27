/*
 * =================================================================
 * == FILE: src/admin/screens/productManagement/EditProductScreen.tsx
 * =================================================================
 */
import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {productService} from '../../api/product';
import {NewProduct, Product, UpdateProduct} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import ProductDetailForm from '../../components/productManagement/ProductDetailForm';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import {parseApiError} from '@/shared/utils/errorHandler';

type ParamList = {
    EditProduct: {
        productId: number;
    };
};

const EditProductScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'EditProduct'>>();
    const {productId} = route.params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialProductData, setInitialProductData] = useState<Partial<NewProduct> | undefined>(undefined);

    const loadInitialData = useCallback(async () => {
        try {
            const response = await productService.getProduct(productId);
            const productData: Product = response.data;
            const formattedData: Partial<NewProduct> = {
                productName: productData.name,
                price: parseFloat(productData.price),
                quantity: productData.quantity,
                categoryId: [productData.Category?.[0]?.categoryId.toString()],
                status: Boolean(productData.isActive),
                image: productData.productImage,
            };
            setInitialProductData(formattedData);
        } catch (e: any) {
            setError(parseApiError(e));
        } finally {
            setLoading(false); // Only set pageLoading to false
        }
    }, [productId]);

    // 2. Call the function on initial component load
    useEffect(() => {
        loadInitialData()
    }, [productId]);

    const handleUpdateProduct = async (values: any) => {
        setLoading(true);
        setError(null);
        try {
            values.productId = productId;
            const response = await productService.updateProduct(productId, values);
            // TODO: Either remove the helper or implemented, used for resetting the form when updating product in product screen
            setInitialProductData(values);
            Alert.alert('Success', 'Product updated successfully!', [
                {text: 'OK', onPress: () => navigation.goBack()},
            ]);
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <ProductDetailForm
                    initialValues={initialProductData}
                    onSubmit={handleUpdateProduct}
                    isEditMode={true}
                />
                {error && <ErrorText message={error}/>}
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
