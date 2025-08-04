import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from "@/admin/screens/productManagement/ProductListScreen";

// TODO: Create and import ProductDetailScreen

export type StorefrontStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: number };
    // Add other storefront screens like Cart, Checkout, etc.
};

const Stack = createStackNavigator<StorefrontStackParamList>();

const StorefrontNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ title: 'Marketplace' }}
            />
            {/* <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productName })}
      />
      */}
        </Stack.Navigator>
    );
};

export default StorefrontNavigator;
