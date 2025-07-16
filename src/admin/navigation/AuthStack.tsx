/*
* =================================================================
* == FILE: src/navigation/AuthStack.tsx
* =================================================================
*
* This navigator handles all authentication-related screens.
* For now, it only contains the Login screen.
*/
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide header for the auth flow
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
    );
};

export default AuthStack;
