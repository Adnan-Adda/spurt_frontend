/*
 * =================================================================
 * == FILE: src/screens/admin/ProductListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all products.
 */

import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getProductListApi} from '../../api/product';
import {Product} from '@/shared/types';
import ProductListItem from '../../components/productManagement/ProductListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import {parseApiError} from "@/shared/utils/errorHandler";

type AdminStackParamList = {
    ProductList: undefined;
    CreateProduct: undefined;
};
type ProductListNavigationProp = StackNavigationProp<AdminStackParamList, 'ProductList'>;

const ProductListScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<ProductListNavigationProp>();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // ToDo
            // Fetch first 20 products for now. We can add pagination later.
            const response = await getProductListApi(50, 0);
            if (response.data && response.data.status === 1) {
                setProducts(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch products');
            }
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <ErrorText message={error}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AppButton title="Create New Product" onPress={() => navigation.navigate('CreateProduct')}/>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.productId.toString()}
                renderItem={({item}) => (
                    <ProductListItem product={item} onPress={() => console.log('Pressed product:', item.name)}/>
                )}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No products found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductListScreen;