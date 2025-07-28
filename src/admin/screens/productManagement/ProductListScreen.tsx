import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {productService} from '../../../shared/api/product';
import {Product} from '@/shared/types';
import ProductListItem from '../../components/productManagement/ProductListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ConfirmationModal from '../../../shared/components/common/ConfirmationModal';
import {parseApiError} from '@/shared/utils/errorHandler';
import Breadcrumb from "@/admin/components/common/Breadcrumb";
import ListHeader from "@/admin/components/common/ListHeader";
import Pagination from "@/shared/components/common/Pagination";

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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 10;

    const fetchProducts = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);
        const offset = (page - 1) * itemsPerPage;
        try {
            const response = await productService.getProducts({limit: itemsPerPage, offset: offset});
            const response_count = await productService.getProducts({limit: 0, offset: 0, count: true})
            setProducts(response.data);
            setTotalProducts(response_count.data);
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchProducts(currentPage);
        }, [currentPage, fetchProducts])
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Optional: Scroll to top of the list when changing pages
        // flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

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
            const response = await productService.deleteProduct(productId);
            fetchProducts(currentPage);
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
            <Breadcrumb path={['Products', 'Manage Products']}/>
            <ListHeader
                itemCount={totalProducts}
                itemType="Products"
                createButton={
                    <AppButton title="Create Product" onPress={() => navigation.navigate('CreateProduct')}/>
                }
            />
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
                ListFooterComponent={
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalProducts}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />}
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