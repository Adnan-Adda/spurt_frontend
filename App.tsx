import React from 'react';
import {AuthProvider} from './src/shared/state/AuthContext';
import AppNavigator from './src/admin/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                {/* We can later add logic here to decide whether to show
            the Admin, Seller, or Storefront app */}
                <AppNavigator/>
                <StatusBar style="auto"/>
            </NavigationContainer>
        </AuthProvider>
    );
}