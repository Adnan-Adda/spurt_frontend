/*
 * =================================================================
 * == FILE: src/admin/navigation/ProductSubTabNavigator.tsx
 * =================================================================
 *
 * This new component creates the sub-tabs for the "Products" module,
 * allowing the user to switch between managing products and categories.
 */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '@/shared/styles/colors';

// Import the list screens that will be our tabs
import ProductListScreen from '../screens/productManagement/ProductListScreen';
import CategoryListScreen from '../screens/productManagement/CategoryListScreen';

const Tab = createMaterialTopTabNavigator();

const ProductSubTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.primary,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen name="Manage Products" component={ProductListScreen}/>
            <Tab.Screen name="Manage Categories" component={CategoryListScreen}/>
        </Tab.Navigator>
    );
};

export default ProductSubTabNavigator;
