/*
 * =================================================================
 * == FILE: src/navigation/AdminStack.tsx
 * =================================================================
 *
 * This is a placeholder for the main admin panel navigator.
 * It will contain all the screens accessible after a successful login.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/admin/DashboardScreen';
import ProductListScreen from '../screens/admin/ProductListScreen';
import CreateUserScreen from '../screens/admin/CreateUserScreen';
import { colors } from '../styles/colors';

const AdminStackNav = createStackNavigator();

const AdminStack = () => {
    return (
        <AdminStackNav.Navigator
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
            {/*<AdminStackNav.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />*/}
            {/*<AdminStackNav.Screen*/}
            {/*    name="ProductList"*/}
            {/*    component={ProductListScreen}*/}
            {/*    options={{ title: 'Products' }}*/}
            {/*/>*/}
            <AdminStackNav.Screen
                name="CreateUser"
                component={CreateUserScreen}
                options={{ title: 'Create New User' }}
            />
        </AdminStackNav.Navigator>
    );
};

export default AdminStack;