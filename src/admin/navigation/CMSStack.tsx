/*
 * =================================================================
 * == FILE: src/admin/navigation/CMSStack.tsx
 * =================================================================
 *
 * A new, dedicated StackNavigator for the "CMS" tab.
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '@/shared/styles/colors';
import BannerListScreen from '../screens/cms/BannerListScreen';
import CreateBannerScreen from '../screens/cms/CreateBannerScreen';
import EditBannerScreen from "@/admin/screens/cms/EditBannerScreen";

const Stack = createStackNavigator();

const CMSStack = () => {
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
                name="BannerList"
                component={BannerListScreen}
                options={{headerShown: false}} // The list screen has its own header components
            />
            <Stack.Screen
                name="CreateBanner"
                component={CreateBannerScreen}
                options={{title: 'Create New Banner'}}
            />
            <Stack.Screen
                name="EditBanner"
                component={EditBannerScreen}
                options={{title: 'Edit Banner'}}
            />
        </Stack.Navigator>
    );
};

export default CMSStack;
