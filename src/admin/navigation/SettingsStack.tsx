/*
 * =================================================================
 * == FILE: src/admin/navigation/SettingsStack.tsx
 * =================================================================
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/shared/styles/colors';

import SettingsScreen from '../screens/settings/SettingsScreen';
import StoreSettingsScreen from '../screens/settings/StoreSettingsScreen';

const Stack = createStackNavigator();

const SettingsStack = () => {
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
                name="SettingsMenu"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />
            <Stack.Screen
                name="StoreSettings"
                component={StoreSettingsScreen}
                options={{ title: 'Store Settings' }}
            />
        </Stack.Navigator>
    );
};

export default SettingsStack;
