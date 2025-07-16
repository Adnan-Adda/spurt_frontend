/*
 * =================================================================
 * == FILE: src/admin/navigation/ProductStack.tsx
 * =================================================================
 *
 * This is a dedicated StackNavigator for the "Products" tab.
 * It contains all screens related to managing products and categories.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/shared/styles/colors';

// Import all the relevant screens for this module
import ProductManagementScreen from '../screens/productManagement/ProductManagementScreen';
import CategoryListScreen from '../screens/productManagement/CategoryListScreen';
import CreateCategoryScreen from '../screens/productManagement/CreateCategoryScreen';
import EditCategoryScreen from '../screens/productManagement/EditCategoryScreen';
import ProductListScreen from '../screens/productManagement/ProductListScreen';
import CreateProductScreen from '../screens/productManagement/CreateProductScreen';
import EditProductScreen from '../screens/productManagement/EditProductScreen';

const Stack = createStackNavigator();

const ProductStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="ProductManagement" component={ProductManagementScreen} options={{ title: 'Product Management' }} />
            <Stack.Screen name="CategoryList" component={CategoryListScreen} options={{ title: 'Categories' }} />
            <Stack.Screen name="CreateCategory" component={CreateCategoryScreen} options={{ title: 'Create Category' }} />
            <Stack.Screen name="EditCategory" component={EditCategoryScreen} options={{ title: 'Edit Category' }} />
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
            <Stack.Screen name="CreateProduct" component={CreateProductScreen} options={{ title: 'Create Product' }} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Edit Product' }} />
        </Stack.Navigator>
    );
};

export default ProductStack;
