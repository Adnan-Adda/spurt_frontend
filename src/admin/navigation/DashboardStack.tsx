/*
 * =================================================================
 * == FILE: src/navigation/DashboardStack.tsx
 * =================================================================
 *
 * This is a dedicated StackNavigator for the Dashboard tab.
 * It allows us to have a header and potentially navigate to other
 * screens from the dashboard in the future.
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import {colors} from '@/shared/styles/colors';

const Stack = createStackNavigator();

const DashboardStack = () => {
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
                name="DashboardRoot"
                component={DashboardScreen}
                options={{title: 'Dashboard'}}
            />
        </Stack.Navigator>
    );
};

export default DashboardStack;
