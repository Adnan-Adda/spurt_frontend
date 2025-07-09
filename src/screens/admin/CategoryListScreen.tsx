/*
 * =================================================================
 * == FILE: src/screens/admin/CategoryListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all product categories.
 */
import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCategoryListApi } from '../../api/category';
import { Category } from '../../types';
import CategoryListItem from '../../components/admin/CategoryListItem';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorText from '../../components/common/ErrorText';
import { colors } from '../../styles/colors';

const CategoryListScreen = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                data={categories}
                keyExtractor={(item) => item.categoryId.toString()}
                renderItem={({ item }) => (
                    <CategoryListItem category={item} onPress={() => console.log('Pressed category:', item.name)} />
                )}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No categories found.</Text>
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

export default CategoryListScreen;
