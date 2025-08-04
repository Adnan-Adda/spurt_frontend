import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../state/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import MainTabNavigator from '../../admin/navigation/MainTabNavigator'; // Admin Logged-In App
import AdminAuthStack from '../../admin/navigation/AdminAuthStack'; // Admin Auth Flow
import SellerAuthStack from '../../seller/navigation/SellerAuthStack'; // Seller Auth Flow
import StorefrontNavigator from '../../storefront/navigation/StorefrontNavigator'; // Customer Shopping Flow
// TODO: Create and import SellerTabNavigator for logged-in sellers

// This defines all possible top-level routes
export type RootStackParamList = {
    Landing: undefined;
    Storefront: undefined;
    AdminAuth: undefined;
    AdminApp: undefined;
    SellerAuth: undefined;
    // SellerApp: undefined; // For the logged-in seller dashboard
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const { session, isInitialLoading } = useAuth();
    if (isInitialLoading) {
        return <LoadingScreen/>;
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {session.token ? (
                // --- A USER IS LOGGED IN ---
                <>
                    {session.userType === 'admin' ? (
                        <Stack.Screen name="AdminApp" component={MainTabNavigator}/>
                    ) : session.userType === 'seller' ? (
                        // TODO: Replace this with the actual logged-in seller dashboard navigator
                        // For now, we'll just show the storefront as a placeholder
                        <Stack.Screen name="Storefront" component={StorefrontNavigator}/>
                    ) : (
                        // Fallback for unknown user type or a logged-in customer
                        <Stack.Screen name="Storefront" component={StorefrontNavigator}/>
                    )}
                </>
            ) : (
                // --- NO USER IS LOGGED IN ---
                <>
                    <Stack.Screen name="Landing" component={LandingScreen}/>
                    <Stack.Screen name="Storefront" component={StorefrontNavigator}/>
                    <Stack.Screen name="AdminAuth" component={AdminAuthStack}/>
                    <Stack.Screen name="SellerAuth" component={SellerAuthStack}/>
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
