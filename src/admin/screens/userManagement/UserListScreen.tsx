/*
 * =================================================================
 * == FILE: src/screens/admin/UserListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all users.
 */
import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getUserListApi, deleteUserApi} from '../../../shared/api/user';
import {User} from '@/shared/types';
import UserListItem from '../../components/userManagement/UserListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '@/shared/styles/colors';
import ConfirmationModal from '../../../shared/components/common/ConfirmationModal';
import AppButton from "@/shared/components/common/AppButton";
import Breadcrumb from "@/admin/components/common/Breadcrumb";
import ListHeader from "@/admin/components/common/ListHeader";

type AdminStackParamList = {
    UserList: undefined;
    CreateUser: undefined;
    EditUser: { user: User }; // <-- Pass the entire User object
};
type UserListScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'UserList'>;

const UserListScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<UserListScreenNavigationProp>();
    // State for the custom modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUserListApi(50, 0);
            if (response.data && response.data.status === 1) {
                setUsers(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch users');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    const handleUserPress = (user: User) => { // <-- Receive the full user object
        navigation.navigate('EditUser', {user}); // <-- Pass the full user object
    };
    // Step 1: When delete is pressed, store the user and show the modal
    const handleDeletePress = (user: User) => {
        setUserToDelete(user);
        setModalVisible(true);
    };

    // Step 2: If confirmed, call the delete API and hide the modal
    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete.userId);
        }
        setModalVisible(false);
        setUserToDelete(null);
    };

    // Step 3: If cancelled, just hide the modal
    const handleCancelDelete = () => {
        setModalVisible(false);
        setUserToDelete(null);
    };

    const deleteUser = async (userId: number) => {
        try {
            const response = await deleteUserApi(userId);
            if (response.data && response.data.status === 1) {
                // Using Alert here for a simple success message is fine
                Alert.alert('Success', 'User deleted successfully.');
                fetchUsers();
            } else {
                throw new Error(response.data.message || 'Failed to delete user.');
            }
        } catch (err: any) {
            Alert.alert('Error', err.message || 'An unknown error occurred.');
        }
    };
    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <ErrorText message={error}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Breadcrumb path={['Sellers', 'Manage Sellers']}/>
            <ListHeader
                itemCount={users.length}
                itemType="Sellers"
                createButton={
                    <AppButton title="Create Seller" onPress={() => navigation.navigate('CreateUser')}/>
                }
            />
            <FlatList
                data={users}
                keyExtractor={(item) => item.userId.toString()}
                renderItem={({item}) => (
                    <UserListItem
                        user={item}
                        onPress={() => handleUserPress(item)}
                        onDelete={() => handleDeletePress(item)}/>
                )}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No users found.</Text>
                    </View>
                }
            />
            {/* Render the modal */
            }
            {
                userToDelete && (
                    <ConfirmationModal
                        visible={isModalVisible}
                        title="Delete User"
                        message={`Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}? This action cannot be undone.`}
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                        confirmButtonText="Delete"
                    />
                )
            }
        </SafeAreaView>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserListScreen;