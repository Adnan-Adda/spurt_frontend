/*
 * =================================================================
 * == FILE: src/navigation/AppNavigator.tsx
 * =================================================================
 *
 * This is the main navigator. It uses the AuthContext to decide
 * whether to show the authentication screens or the main admin panel.
 * It also shows a loading screen during the initial auth check.
 */
import React, {useContext} from 'react';
import {AuthContext} from '@/shared/state/AuthContext';
import AuthStack from './AuthStack';
import LoadingScreen from '../../shared/screens/LoadingScreen';
import MainTabNavigator from "./MainTabNavigator";

const AppNavigator = () => {
    const {userToken, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <LoadingScreen/>;
    }

    return userToken ? <MainTabNavigator/> : <AuthStack/>;
};

export default AppNavigator;