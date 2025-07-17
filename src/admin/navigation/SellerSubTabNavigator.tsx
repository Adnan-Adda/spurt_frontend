/*
 * =================================================================
 * == FILE: src/admin/navigation/SellerSubTabNavigator.tsx
 * =================================================================
 *
 * This new component creates the sub-tabs for the "Sellers" module,
 * allowing the user to switch between managing sellers and roles.
 */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '@/shared/styles/colors';
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
                swipeEnabled: false,
            }}
        >
            <Tab.Screen name="Sellers Management" component={UserListScreen}/>
            <Tab.Screen name="Roles Management" component={RoleListScreen}/>
        </Tab.Navigator>
    );
};

export default SellerSubTabNavigator;
