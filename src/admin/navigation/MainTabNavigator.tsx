/*
 * =================================================================
 * == FILE: src/navigation/MainTabNavigator.tsx
 * =================================================================
 *
 * This is the main Tab Navigator that holds our top-level modules.
 * Each tab renders its own StackNavigator, creating a modular design.
 */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Ionicons} from '@expo/vector-icons';
import DashboardStack from './DashboardStack';
import SellerStack from './SellerStack';
import {colors} from '@/shared/styles/colors';
import ProductStack from "@/admin/navigation/ProductStack";
import CMSStack from "@/admin/navigation/CMSStack";
import OrderStack from "@/admin/navigation/OrderStack";
import SettingsStack from "@/admin/navigation/SettingsStack";

const Tab = createMaterialTopTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.primary,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                },
                tabBarStyle: {
                    backgroundColor: colors.background,
                },
                swipeEnabled: false,

                tabBarIcon: ({focused, color}) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Sellers') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Products') {
                        iconName = focused ? 'cube' : 'cube-outline';
                    } else if (route.name === 'CMS') {
                        iconName = focused ? 'document-text' : 'document-text-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    }else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else {
                        iconName = 'alert-circle'; // Fallback icon
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={22} color={color}/>;
                }
                ,
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardStack}/>
            <Tab.Screen name="Sellers" component={SellerStack}/>
            <Tab.Screen name="Products" component={ProductStack}/>
            <Tab.Screen name="CMS" component={CMSStack}/>
            <Tab.Screen name="Orders" component={OrderStack}/>
            <Tab.Screen name="Settings" component={SettingsStack}/>
            {/* We will add more tabs like 'Marketplace' and 'CMS' here later */
            }
        </Tab.Navigator>
    );
};

export default MainTabNavigator;