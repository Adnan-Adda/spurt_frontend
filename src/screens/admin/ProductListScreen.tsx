/*
 * =================================================================
 * == FILE: src/screens/admin/ProductListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all products.
 */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import { getProductListApi } from '../../api/product';
import { Product } from '../../types';
import ProductListItem from '../../components/admin/ProductListItem';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorText from '../../components/common/ErrorText';
import { colors } from '../../styles/colors';

const ProductListScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // ToDo
            // Fetch first 20 products for now. We can add pagination later.
            const response = await getProductListApi(20, 0);
            if (response.data && response.data.status === 1) {
                setProducts(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch products');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <ErrorText message={error} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.productId.toString()}
                renderItem={({ item }) => (
                    <ProductListItem product={item} onPress={() => console.log('Pressed product:', item.name)} />
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductListScreen;
