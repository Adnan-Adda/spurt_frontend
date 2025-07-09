/*
 * =================================================================
 * == FILE: src/screens/admin/EditUserScreen.tsx
 * =================================================================
 *
 * A new screen for editing an existing user's details.
 */
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Alert, View } from 'react-native';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import { getRolesApi } from '../../api/role';
// import { getUserProfileApi, updateUserApi } from '../../api/user';
// import { Role, UpdateUser } from '../../types';
// import { colors } from '../../styles/colors';
// import AppButton from '../../components/common/AppButton';
// import ErrorText from '../../components/common/ErrorText';
// import UserDetailForm from '../../components/admin/UserDetailForm';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
//
// type ParamList = {
//     EditUser: {
//         userId: number;
//     };
// };
//
// const EditUserScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute<RouteProp<ParamList, 'EditUser'>>();
//     const { userId } = route.params;
//     console.log('userId:', userId);
//     const [roles, setRoles] = useState<Role[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [pageLoading, setPageLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [form, setForm] = useState<Partial<UpdateUser>>({});
//
//     useEffect(() => {
//         const loadInitialData = async () => {
//             try {
//                 const rolesResponse = await getRolesApi();
//                 if (rolesResponse.data && rolesResponse.data.status === 1) {
//                     setRoles(rolesResponse.data.data);
//                 } else {
//                     throw new Error('Failed to load roles');
//                 }
//
//                 const userResponse = await getUserProfileApi(userId);
//                 if (userResponse.data && userResponse.data.status === 1) {
//                     const userData = userResponse.data.data;
//                     setForm({
//                         firstName: userData.firstName,
//                         lastName: userData.lastName,
//                         email: userData.email,
//                         username: userData.username,
//                         userGroupId: userData.userGroupId,
//                     });
//                 } else {
//                     throw new Error('Failed to load user profile');
//                 }
//             } catch (e: any) {
//                 setError(e.message || 'Failed to load page data.');
//             } finally {
//                 setPageLoading(false);
//             }
//         };
//         loadInitialData();
//     }, [userId]);
//
//     const handleInputChange = (name: keyof UpdateUser, value: string | number) => {
//         setForm(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleUpdateUser = async () => {
//         if (!form.firstName || !form.lastName || !form.email || !form.userGroupId) {
//             setError('Please fill out all required fields.');
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const payload: UpdateUser = {
//                 firstName: form.firstName,
//                 lastName: form.lastName,
//                 email: form.email,
//                 username: form.email, // Keep username in sync with email
//                 userGroupId: form.userGroupId,
//             };
//             // Only include the password if it was changed
//             if (form.password) {
//                 payload.password = form.password;
//             }
//
//             const response = await updateUserApi(userId, payload);
//             if (response.data && response.data.status === 1) {
//                 Alert.alert('Success', 'User updated successfully!', [
//                     { text: 'OK', onPress: () => navigation.goBack() }
//                 ]);
//             } else {
//                 throw new Error(response.data.message || 'Failed to update user.');
//             }
//         } catch (err: any) {
//             setError(err.message || 'An unknown error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     if (pageLoading) {
//         return <LoadingSpinner />;
//     }
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView style={styles.container}>
//                 <UserDetailForm
//                     form={form}
//                     roles={roles}
//                     onInputChange={handleInputChange}
//                     isEditing={true}
//                 />
//                 {error && <ErrorText message={error} />}
//                 <AppButton title="Update User" onPress={handleUpdateUser} loading={loading} />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },
//     container: {
//         flex: 1,
//         padding: 20,
//     },
// });
//
// export default EditUserScreen;


import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {getRolesApi} from '../../api/role';
import {updateUserApi} from '../../api/user';
import {Role, UpdateUser, User} from '../../types';
import {colors} from '../../styles/colors';
import AppButton from '../../components/common/AppButton';
import ErrorText from '../../components/common/ErrorText';
import UserDetailForm from '../../components/admin/UserDetailForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type ParamList = {
    EditUser: {
        user: User; // <-- Receive the full User object
    };
};

const EditUserScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'EditUser'>>();
    const {user} = route.params; // <-- Get the user object from route params

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<UpdateUser>>({});

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // We still need to fetch the list of available roles
                const rolesResponse = await getRolesApi();
                if (rolesResponse.data && rolesResponse.data.status === 1) {
                    setRoles(rolesResponse.data.data);
                } else {
                    throw new Error('Failed to load roles');
                }

                // Pre-fill the form with the user data passed via navigation
                setForm({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    userGroupId: user.usergroup.groupId,
                });

            } catch (e: any) {
                setError(e.message || 'Failed to load page data.');
            } finally {
                setPageLoading(false);
            }
        };
        loadInitialData();
    }, [user]);

    const handleInputChange = (name: keyof UpdateUser, value: string | number) => {
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleUpdateUser = async () => {
        if (!form.firstName || !form.lastName || !form.email || !form.userGroupId) {
            setError('Please fill out all required fields.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const payload: UpdateUser = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                username: form.email,
                userGroupId: form.userGroupId,
            };
            if (form.password && form.password.trim().length > 0) {
                payload.password = form.password;
            }

            const response = await updateUserApi(user.userId, payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'User updated successfully!', [
                    {text: 'OK', onPress: () => navigation.goBack()}
                ]);
            } else {
                setError(response.data.message)
                throw new Error(response.data.message || 'Failed to update user.');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return <LoadingSpinner/>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <UserDetailForm
                    form={form}
                    roles={roles}
                    onInputChange={handleInputChange}
                    isEditing={true}
                />
                {error && <ErrorText message={error}/>}
                <AppButton title="Update User" onPress={handleUpdateUser} loading={loading}/>
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
        padding: 20,
    },
});

export default EditUserScreen;
