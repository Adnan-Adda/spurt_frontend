/*
 * =================================================================
 * == FILE: src/screens/admin/CreateUserScreen.tsx
 * =================================================================
 *
 * This screen provides a form for the Admin to create a new user,
 * which can be a Vendor or another Admin.
 */
// import React, {useState, useEffect} from 'react';
// import {SafeAreaView, ScrollView, StyleSheet, View, Text, Alert} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {Picker} from '@react-native-picker/picker';
// import {getRolesApi} from '../../api/role';
// import {createUserApi} from '../../api/user';
// import {Role, NewUser} from '../../types';
// import {colors} from '../../styles/colors';
// import AppTextInput from '../../components/common/AppTextInput';
// import AppButton from '../../components/common/AppButton';
// import ErrorText from '../../components/common/ErrorText';
//
// const CreateUserScreen = () => {
//     const [roles, setRoles] = useState<Role[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [form, setForm] = useState<NewUser>({
//         firstName: '',
//         lastName: '',
//         username: '',
//         email: '',
//         password: '',
//         userGroupId: 0,
//     });
//     const navigation = useNavigation();
//
//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const response = await getRolesApi();
//                 if (response.data && response.data.status === 1) {
//                     setRoles(response.data.data);
//                     // Set default role if available
//                     if (response.data.data.length > 0) {
//                         setForm(prev => ({...prev, userGroupId: response.data.data[0].groupId}));
//                     }
//                 }
//             } catch (e) {
//                 setError('Failed to load user roles.');
//             }
//         };
//         fetchRoles();
//     }, []);
//
//     const handleInputChange = (name: keyof NewUser, value: string | number) => {
//         setForm(prev => ({...prev, [name]: value}));
//     };
//
//     const handleCreateUser = async () => {
//         if (!form.firstName || !form.lastName || !form.email || !form.password || !form.userGroupId) {
//             setError('Please fill out all fields.');
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             // The API uses 'username' for the login, so let's set it to the email by default
//             const payload = {...form, username: form.email};
//             const response = await createUserApi(payload);
//             if (response.data && response.data.status === 1) {
//                 Alert.alert('Success', 'User created successfully!', [
//                     {text: 'OK', onPress: () => navigation.goBack()}
//                 ]);
//             } else {
//                 throw new Error(response.data.message || 'Failed to create user.');
//             }
//         } catch (err: any) {
//             setError(err.message || 'An unknown error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView style={styles.container}>
//                 <AppTextInput
//                     label="First Name"
//                     value={form.firstName}
//                     onChangeText={(val) => handleInputChange('firstName', val)}
//                     placeholder="Enter user's first name"
//                 />
//                 <AppTextInput
//                     label="Last Name"
//                     value={form.lastName}
//                     onChangeText={(val) => handleInputChange('lastName', val)}
//                     placeholder="Enter user's last name"
//                 />
//                 <AppTextInput
//                     label="Email Address"
//                     value={form.email}
//                     onChangeText={(val) => handleInputChange('email', val)}
//                     placeholder="Enter user's email"
//                     //keyboardType="email-address"
//                 />
//                 <AppTextInput
//                     label="Password"
//                     value={form.password || ''}
//                     onChangeText={(val) => handleInputChange('password', val)}
//                     placeholder="Enter a strong password"
//                     secureTextEntry
//                 />
//                 <Text style={styles.pickerLabel}>User Role</Text>
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={form.userGroupId}
//                         onValueChange={(itemValue) => handleInputChange('userGroupId', itemValue)}
//                         style={styles.picker}
//                         enabled={roles.length > 0}
//                     >
//                         {roles.length > 0 ? roles.map(role => (
//                             <Picker.Item key={role.groupId} label={role.name} value={role.groupId}/>
//                         )) : <Picker.Item label="Loading roles..." value={0}/>}
//                     </Picker>
//                 </View>
//
//                 {error && <ErrorText message={error}/>}
//
//                 <AppButton title="Create User" onPress={handleCreateUser} loading={loading}/>
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
//     pickerLabel: {
//         fontSize: 14,
//         color: colors.text,
//         marginBottom: 8,
//         fontWeight: '600',
//     },
//     pickerContainer: {
//         backgroundColor: colors.inputBackground,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: colors.border,
//         marginBottom: 10,
//     },
//     picker: {
//         width: '100%',
//         height: 50
//     },
// });
//
// export default CreateUserScreen;


import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getRolesApi} from '../../api/role';
import {createUserApi} from '../../api/user';
import {Role, NewUser} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import UserDetailForm from '../../components/userManagement/UserDetailForm';

const CreateUserScreen = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<NewUser>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        userGroupId: 0,
    });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRolesApi();
                if (response.data && response.data.status === 1) {
                    setRoles(response.data.data);
                    if (response.data.data.length > 0) {
                        setForm(prev => ({...prev, userGroupId: response.data.data[0].groupId}));
                    }
                }
            } catch (e) {
                setError('Failed to load user roles.');
            }
        };
        fetchRoles();
    }, []);

    const handleInputChange = (name: keyof NewUser, value: string | number) => {
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleCreateUser = async () => {
        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.userGroupId) {
            setError('Please fill out all fields.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const payload = {...form, username: form.email};
            const response = await createUserApi(payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'User created successfully!', [
                    {text: 'OK', onPress: () => navigation.goBack()}
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to create user.');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <UserDetailForm
                    form={form}
                    roles={roles}
                    onInputChange={handleInputChange}
                    isEditing={false}
                />
                {error && <ErrorText message={error}/>}
                <AppButton title="Create User" onPress={handleCreateUser} loading={loading}/>
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

export default CreateUserScreen;

