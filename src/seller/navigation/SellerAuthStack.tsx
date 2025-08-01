import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SellerRegistrationScreen from '../screens/auth/SellerRegistrationScreen';
import SellerLoginScreen from '../screens/auth/SellerLoginScreen';

// Define the ParamList for type safety
export type SellerAuthStackParamList = {
    SellerLogin: undefined;
    SellerRegister: undefined;
    // Add other auth screens like ForgotPassword here
};

const Stack = createStackNavigator<SellerAuthStackParamList>();

const SellerAuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SellerLogin" component={SellerLoginScreen} />
            <Stack.Screen name="SellerRegister" component={SellerRegistrationScreen} />
        </Stack.Navigator>
    );
};

export default SellerAuthStack;
