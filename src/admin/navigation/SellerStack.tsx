/*
 * =================================================================
 * == FILE: src/navigation/SellerStack.tsx
 * =================================================================
 *
 * This is a dedicated StackNavigator for the "Sellers" tab.
 * It contains all screens related to managing users and roles.
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserManagementScreen from "../screens/userManagement/UserManagementScreen";
import {colors} from "@/shared/styles/colors";
import UserListScreen from "../screens/userManagement/UserListScreen";
import CreateUserScreen from "../screens/userManagement/CreateUserScreen";
import EditUserScreen from "../screens/userManagement/EditUserScreen";
import RoleListScreen from "../screens/userManagement/RoleListScreen";
import CreateRoleScreen from "../screens/userManagement/CreateRoleScreen";
import EditRoleScreen from "../screens/userManagement/EditRoleScreen";

const Stack = createStackNavigator();

const SellerStack = () => {
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
            <Stack.Screen
                name="UserManagement"
                component={UserManagementScreen}
                options={{title: 'Seller Management'}}
            />
            <Stack.Screen
                name="UserList"
                component={UserListScreen}
                options={{title: 'All Sellers'}}
            />
            <Stack.Screen
                name="CreateUser"
                component={CreateUserScreen}
                options={{title: 'Create New Seller'}}
            />
            <Stack.Screen
                name="EditUser"
                component={EditUserScreen}
                options={{title: 'Edit Seller'}}
            />
            <Stack.Screen
                name="RoleList"
                component={RoleListScreen}
                options={{title: 'Manage Roles'}}
            />
            <Stack.Screen
                name="CreateRole"
                component={CreateRoleScreen}
                options={{title: 'Create New Role'}}
            />
            <Stack.Screen
                name="EditRole"
                component={EditRoleScreen}
                options={{title: 'Edit Role'}}
            />
        </Stack.Navigator>
    );
};

export default SellerStack;
