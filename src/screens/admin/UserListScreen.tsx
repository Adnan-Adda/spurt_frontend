/*
 * =================================================================
 * == FILE: src/screens/admin/UserListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all users.
 */
// import React, { useEffect, useState, useCallback } from 'react';
// import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { getUserListApi } from '../../api/user';
// import { User } from '../../types';
// import UserListItem from '../../components/admin/UserListItem';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import ErrorText from '../../components/common/ErrorText';
// import { colors } from '../../styles/colors';
//
// const UserListScreen = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             // Fetch first 50 users. We can add pagination later.
//             const response = await getUserListApi(50, 0);
//             if (response.data && response.data.status === 1) {
//                 setUsers(response.data.data);
//             } else {
//                 throw new Error(response.data.message || 'Failed to fetch users');
//             }
//         } catch (err: any) {
//             setError(err.message || 'An unknown error occurred');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // useFocusEffect will re-fetch data every time the screen comes into view.
//     // This is useful for seeing newly created users without a manual refresh.
//     useFocusEffect(
//         useCallback(() => {
//             fetchUsers();
//         }, [])
//     );
//
//     if (loading) {
//         return <LoadingSpinner />;
//     }
//
//     if (error) {
//         return (
//             <View style={styles.centerContainer}>
//                 <ErrorText message={error} />
//             </View>
//         );
//     }
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={users}
//                 keyExtractor={(item) => item.userId.toString()}
//                 renderItem={({ item }) => (
//                     <UserListItem user={item} onPress={() => console.log('Pressed user:', item.firstName)} />
//                 )}
//                 ListEmptyComponent={
//                     <View style={styles.centerContainer}>
//                         <Text>No users found.</Text>
//                     </View>
//                 }
//             />
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },
//     centerContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
//
// export default UserListScreen;


//
// import React, { useEffect, useState, useCallback } from 'react';
// import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { getUserListApi } from '../../api/user';
// import { User } from '../../types';
// import UserListItem from '../../components/admin/UserListItem';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import ErrorText from '../../components/common/ErrorText';
// import { colors } from '../../styles/colors';
//
// type AdminStackParamList = {
//     UserList: undefined;
//     EditUser: { userId: number };
// };
// type UserListScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'UserList'>;
//
// const UserListScreen = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const navigation = useNavigation<UserListScreenNavigationProp>();
//
//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await getUserListApi(50, 0);
//             if (response.data && response.data.status === 1) {
//                 setUsers(response.data.data);
//             } else {
//                 throw new Error(response.data.message || 'Failed to fetch users');
//             }
//         } catch (err: any) {
//             setError(err.message || 'An unknown error occurred');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useFocusEffect(
//         useCallback(() => {
//             fetchUsers();
//         }, [])
//     );
//
//     const handleUserPress = (userId: number) => {
//         navigation.navigate('EditUser', { userId });
//     };
//
//     if (loading) {
//         return <LoadingSpinner />;
//     }
//
//     if (error) {
//         return (
//             <View style={styles.centerContainer}>
//                 <ErrorText message={error} />
//             </View>
//         );
//     }
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={users}
//                 keyExtractor={(item) => item.userId.toString()}
//                 renderItem={({ item }) => (
//                     <UserListItem user={item} onPress={() => handleUserPress(item.userId)} />
//                 )}
//                 ListEmptyComponent={
//                     <View style={styles.centerContainer}>
//                         <Text>No users found.</Text>
//                     </View>
//                 }
//             />
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },
//     centerContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
//
// export default UserListScreen;

import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getUserListApi, deleteUserApi} from '../../api/user';
import {User} from '../../types';
import UserListItem from '../../components/admin/UserListItem';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorText from '../../components/common/ErrorText';
import {colors} from '../../styles/colors';
import ConfirmationModal from '../../components/common/ConfirmationModal';

type AdminStackParamList = {
    UserList: undefined;
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

    // const handleDeletePress = (user: User) => {
    //     Alert.alert(
    //         'Delete User',
    //         `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`,
    //         [
    //             {
    //                 text: 'Cancel',
    //                 onPress: () => console.log('[UserListScreen] Delete cancelled.'),
    //                 style: 'cancel',
    //             },
    //             {
    //                 text: 'Delete',
    //                 onPress: () => deleteUser(user.userId),
    //                 style: 'destructive',
    //             },
    //         ]
    //     );
    // };
    //
    // const deleteUser = async (userId: number) => {
    //     try {
    //         const response = await deleteUserApi(userId);
    //         if (response.data && response.data.status === 1) {
    //             Alert.alert('Success', 'User deleted successfully.');
    //             // Refresh the list to show the user has been removed
    //             fetchUsers();
    //         } else {
    //             throw new Error(response.data.message || 'Failed to delete user.');
    //         }
    //     } catch (err: any) {
    //         Alert.alert('Error', err.message || 'An unknown error occurred.');
    //     }
    // };
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
            {/* Render the modal */}
            {userToDelete && (
                <ConfirmationModal
                    visible={isModalVisible}
                    title="Delete User"
                    message={`Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}? This action cannot be undone.`}
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    confirmButtonText="Delete"
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserListScreen;