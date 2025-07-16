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
import {getProductListApi, deleteProductApi} from '../../api/product';
import {Product} from '@/shared/types';
import ProductListItem from '../../components/productManagement/ProductListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ConfirmationModal from '../../../shared/components/common/ConfirmationModal';
import {parseApiError} from '@/shared/utils/errorHandler';

type AdminStackParamList = {
    ProductList: undefined;
    CreateProduct: undefined;
    EditProduct: { productId: number };
};
type ProductListNavigationProp = StackNavigationProp<AdminStackParamList, 'ProductList'>;

const ProductListScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const navigation = useNavigation<ProductListNavigationProp>();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
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

    const handleDeletePress = (product: Product) => {
        setProductToDelete(product);
        setModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.productId);
        }
        setModalVisible(false);
        setProductToDelete(null);
    };

    const deleteProduct = async (productId: number) => {
        try {
            const response = await deleteProductApi(productId);
            if (response.data && response.data.status === 1) {
                fetchProducts();
            } else {
                throw new Error(response.data.message || 'Failed to delete product.');
            }
        } catch (err: any) {
            setError(parseApiError(err));
        }
    };

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
                    <ProductListItem
                        product={item}
                        onPress={() => navigation.navigate('EditProduct', {productId: item.productId})}
                        onDelete={() => handleDeletePress(item)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No products found.</Text>
                    </View>
                }
            />
            {productToDelete && (
                <ConfirmationModal
                    visible={isModalVisible}
                    title="Delete Product"
                    message={`Are you sure you want to delete "${productToDelete.name}"?`}
                    onCancel={() => setModalVisible(false)}
                    onConfirm={handleConfirmDelete}
                    confirmButtonText="Delete"
                />
            )}
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