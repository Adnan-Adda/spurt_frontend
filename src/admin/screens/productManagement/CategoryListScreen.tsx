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
import {getCategoryListApi, deleteCategoryApi} from '../../api/category';
import {Category} from '@/shared/types';
import CategoryListItem from '../../components/productManagement/CategoryListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ConfirmationModal from '../../../shared/components/common/ConfirmationModal';
import {parseApiError} from '@/shared/utils/errorHandler';

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

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getCategoryListApi(50, 0);
            if (response.data && response.data.status === 1) {
                setCategories(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch categories');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }, [])
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

    const deleteCategory = async (categoryId: number) => {
        try {
            const response = await deleteCategoryApi(categoryId);
            if (response.data && response.data.status === 1) {
                fetchCategories();
            } else {
                throw new Error(response.data.message || 'Failed to delete category.');
            }
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
            <View style={styles.header}>
                <AppButton title="Create New Category" onPress={() => navigation.navigate('CreateCategory')}/>
            </View>
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