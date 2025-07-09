/*
 * =================================================================
 * == FILE: src/navigation/AdminStack.tsx
 * =================================================================
 *
 * This is a placeholder for the main admin panel navigator.
 * It will contain all the screens accessible after a successful login.
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/admin/DashboardScreen';
import ProductListScreen from '../screens/admin/ProductListScreen';
import CreateUserScreen from '../screens/admin/CreateUserScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import UserListScreen from '../screens/admin/UserListScreen';
import EditUserScreen from '../screens/admin/EditUserScreen';
import RoleListScreen from '../screens/admin/RoleListScreen';
import CreateRoleScreen from '../screens/admin/CreateRoleScreen';
import EditRoleScreen from '../screens/admin/EditRoleScreen';
import ProductManagementScreen from '../screens/admin/ProductManagementScreen';
import CategoryListScreen from '../screens/admin/CategoryListScreen';
import {colors} from '../styles/colors';

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
            <AdminStackNav.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}}/>
            <AdminStackNav.Screen
                name="UserManagement"
                component={UserManagementScreen}
                options={{title: 'User Management'}}
            />
            <AdminStackNav.Screen
                name="CreateUser"
                component={CreateUserScreen}
                options={{title: 'Create New User'}}
            />
            <AdminStackNav.Screen
                name="UserList"
                component={UserListScreen}
                options={{title: 'All Users'}}
            />
            <AdminStackNav.Screen
                name="EditUser"
                component={EditUserScreen}
                options={{title: 'Edit User'}}
            />
            <AdminStackNav.Screen
                name="RoleList"
                component={RoleListScreen}
                options={{title: 'Manage Roles'}}
            />
            <AdminStackNav.Screen
                name="CreateRole"
                component={CreateRoleScreen}
                options={{title: 'Create New Role'}}
            />
            <AdminStackNav.Screen
                name="EditRole"
                component={EditRoleScreen}
                options={{title: 'Edit Role'}}
            />
            {/* Product Management Flow */}
            <AdminStackNav.Screen
                name="ProductManagement"
                component={ProductManagementScreen}
                options={{title: 'Product Management'}}
            />
            <AdminStackNav.Screen
                name="CategoryList"
                component={CategoryListScreen}
                options={{title: 'Categories'}}
            />
            <AdminStackNav.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{title: 'Products'}}
            />
        </AdminStackNav.Navigator>
    );
};

export default AdminStack;
