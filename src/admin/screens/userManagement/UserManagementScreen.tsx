/*
 * =================================================================
 * == FILE: src/screens/admin/UserManagementScreen.tsx
 * =================================================================
 *
 * A new screen that serves as a sub-menu for all user and
 * role-related actions.
 */
import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';

// Define the types for the navigator to ensure type safety
type AdminStackParamList = {
    UserManagement: undefined;
    CreateUser: undefined;
    UserList: undefined;
    RoleList: undefined;
};
type UserManagementScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'UserManagement'>;

const UserManagementScreen = () => {
    const navigation = useNavigation<UserManagementScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <AppButton
                    title="Create New User"
                    onPress={() => navigation.navigate('CreateUser')}
                />
                <AppButton
                    title="List & Manage Users"
                    onPress={() => navigation.navigate('UserList')}
                />
                <AppButton
                    title="List & Manage Roles"
                    onPress={() => navigation.navigate('RoleList')}
                />
                {/* We will add more buttons here later, e.g., "List Users" */}
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

export default UserManagementScreen;
