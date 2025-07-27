/*
 * =================================================================
 * == FILE: src/screens/admin/CreateProductScreen.tsx
 * =================================================================
 */
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {productService} from '../../api/product';
import {NewProduct} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import ProductDetailForm from '../../components/productManagement/ProductDetailForm';
import {parseApiError} from '@/shared/utils/errorHandler';
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";

const CreateProductScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const handleCreateProduct = async (values: NewProduct) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.createProduct(values);
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
                    initialValues={{}}
                    onSubmit={handleCreateProduct}
                    isEditMode={false}
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

export default CreateProductScreen;