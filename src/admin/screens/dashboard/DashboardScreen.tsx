/*
 * =================================================================
 * == FILE: src/screens/admin/DashboardScreen.tsx (MODIFIED)
 * =================================================================
 *
 * Refactored to be a "Control Panel" that navigates to sub-menus.
 */
import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '@/shared/state/AuthContext';
import { colors } from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import DashboardModuleCard from '../../components/dashboard/DashboardModuleCard';

// Define the types for the navigator to ensure type safety
type AdminStackParamList = {
    Dashboard: undefined;
    UserManagement: undefined;
    ProductManagement: undefined;
    // Add other main modules here as we create them
};
type DashboardScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
    const { logout, user } = useContext(AuthContext);
    const navigation = useNavigation<DashboardScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Control Panel</Text>
                    <Text style={styles.welcomeText}>Welcome, {user?.firstName || 'Admin'}!</Text>
                </View>

                <View style={styles.moduleGrid}>
                    <DashboardModuleCard
                        title="User & Role Management"
                        description="Create vendors, admins, and manage permissions."
                        onPress={() => navigation.navigate('UserManagement')}
                    />
                    {/* We will add more modules here */}
                    <DashboardModuleCard
                        title="Product Management"
                        description="Manage categories, products, and inventory."
                        onPress={() => navigation.navigate('ProductManagement')}
                    />
                    <DashboardModuleCard
                        title="Site Content"
                        description="Manage banners and informational pages."
                        onPress={() => { /* We will create this screen next */ }}
                    />
                </View>

                <View style={styles.footer}>
                    <AppButton title="Logout" onPress={logout} />
                </View>
            </ScrollView>
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
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
    },
    welcomeText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 4,
    },
    moduleGrid: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    footer: {
        padding: 20,
        marginTop: 20,
    }
});

export default DashboardScreen;
