/*
 * =================================================================
 * == FILE: src/navigation/AppNavigator.tsx
 * =================================================================
 *
 * This is the main navigator. It uses the AuthContext to decide
 * whether to show the authentication screens or the main admin panel.
 * It also shows a loading screen during the initial auth check.
 */
import React, { useContext } from 'react';
import { AuthContext } from '../state/AuthContext';
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigator = () => {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return userToken ? <AdminStack /> : <AuthStack />;
};

export default AppNavigator;