/*
 * =================================================================
 * == FILE: src/admin/navigation/SellerSubTabNavigator.tsx
 * =================================================================
 *
 * This new component creates the sub-tabs for the "Sellers" module,
 * allowing the user to switch between managing sellers and roles.
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@/shared/styles/colors';

// Import the list screens that will be our tabs
import UserListScreen from '../screens/userManagement/UserListScreen';
import RoleListScreen from '../screens/userManagement/RoleListScreen';

const Tab = createMaterialTopTabNavigator();

const SellerSubTabNavigator = () => {
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
            <Tab.Screen name="Sellers List" component={UserListScreen} />
            <Tab.Screen name="Roles List" component={RoleListScreen} />
        </Tab.Navigator>
    );
};

export default SellerSubTabNavigator;
