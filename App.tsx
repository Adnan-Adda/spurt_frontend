import React from 'react';
import {AuthProvider} from './src/shared/state/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import RootNavigator from "@/shared/navigation/RootNavigator";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootNavigator />
                <StatusBar style="auto"/>
            </NavigationContainer>
        </AuthProvider>
    );
}