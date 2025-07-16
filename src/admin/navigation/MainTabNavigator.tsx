/*
 * =================================================================
 * == FILE: src/navigation/MainTabNavigator.tsx
 * =================================================================
 *
 * This is the main Tab Navigator that holds our top-level modules.
 * Each tab renders its own StackNavigator, creating a modular design.
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

// Import our new stack navigators
import DashboardStack from './DashboardStack';
import SellerStack from './SellerStack';
import {colors} from '@/shared/styles/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false, // Headers are handled by the child StackNavigators
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if (route.name === 'Dashboard') {
                        iconName = '📊';
                    } else if (route.name === 'Sellers') {
                        iconName = '👥';
                    }
                    return <Text style={{color, fontSize: size}}>{iconName}</Text>;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardStack}/>
            <Tab.Screen name="Sellers" component={SellerStack}/>
            {/* We will add more tabs like 'Marketplace' and 'CMS' here later */}
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
