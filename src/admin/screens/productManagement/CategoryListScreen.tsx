/*
 * =================================================================
 * == FILE: src/screens/admin/CategoryListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all product categories.
 */
import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {categoryService} from '../../../shared/api/category';
import {Category} from '@/shared/types';
import CategoryListItem from '../../components/productManagement/CategoryListItem';
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
    CategoryList: undefined;
    CreateCategory: undefined;
    EditCategory: { category: Category };
};
type CategoryListNavigationProp = StackNavigationProp<AdminStackParamList, 'CategoryList'>;

const CategoryListScreen = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const navigation = useNavigation<CategoryListNavigationProp>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const fetchCategories = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const offset = (page - 1) * itemsPerPage;
            const response = await categoryService.getCategories({limit: itemsPerPage, offset: offset});
            setCategories(response.data);
            // TODO : count dose not work in the backend
            setTotalItems(1000);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCategories(currentPage);
        }, [currentPage, fetchCategories])
    );

    const handleDeletePress = (category: Category) => {
        setCategoryToDelete(category);
        setModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (categoryToDelete) {
            deleteCategory(categoryToDelete.categoryId);
        }
        setModalVisible(false);
        setCategoryToDelete(null);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const deleteCategory = async (categoryId: number) => {
        try {
            const response = await categoryService.deleteCategory(categoryId);
            fetchCategories(currentPage);
        } catch (err: any) {
            const errorMessage = parseApiError(err);
            setError(errorMessage);
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
            <Breadcrumb path={['Products', 'Manage Categories']}/>
            <ListHeader
                itemCount={categories.length}
                itemType="Categories"
                createButton={
                    <AppButton title="Create Category" onPress={() => navigation.navigate('CreateCategory')}/>
                }
            />
            <FlatList
                data={categories}
                keyExtractor={(item) => item.categoryId.toString()}
                renderItem={({item}) => (
                    <CategoryListItem
                        category={item}
                        onPress={() => navigation.navigate('EditCategory', {category: item})}
                        onDelete={() => handleDeletePress(item)}
                    />
                )}
                ListFooterComponent={
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No categories found.</Text>
                    </View>
                }
            />
            {categoryToDelete && (
                <ConfirmationModal
                    visible={isModalVisible}
                    title="Delete Category"
                    message={`Are you sure you want to delete "${categoryToDelete.name}"?`}
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

export default CategoryListScreen;