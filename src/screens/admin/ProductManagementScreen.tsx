/*
 * =================================================================
 * == FILE: src/screens/admin/ProductManagementScreen.tsx
 * =================================================================
 *
 * A new screen that serves as a sub-menu for all product-related actions.
 */
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../styles/colors';
import AppButton from '../../components/common/AppButton';

type AdminStackParamList = {
    ProductManagement: undefined;
    CategoryList: undefined;
};
type ProductManagementScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'ProductManagement'>;

const ProductManagementScreen = () => {
    const navigation = useNavigation<ProductManagementScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <AppButton
                    title="Manage Categories"
                    onPress={() => navigation.navigate('CategoryList')}
                />
                {/* We will add a "Manage Products" button here later */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
});

export default ProductManagementScreen;
