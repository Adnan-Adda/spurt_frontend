/*
 * =================================================================
 * == FILE: src/admin/navigation/OrderStack.tsx
 * =================================================================
 *
 * A new, dedicated StackNavigator for the "Orders" tab.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/shared/styles/colors';

import OrderListScreen from '../screens/orders/OrderListScreen';

const Stack = createStackNavigator();

const OrderStack = () => {
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
                name="OrderList"
                component={OrderListScreen}
                options={{ headerShown: false }}
            />
            {/* We will add OrderDetailScreen here later */}
        </Stack.Navigator>
    );
};

export default OrderStack;
