import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getRolesApi} from '../../../shared/api/role';
import {userService} from '../../../shared/api/user';
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
            const response = await userService.createUser(payload);
            Alert.alert('Success', 'User created successfully!', [
                {text: 'OK', onPress: () => navigation.goBack()}
            ]);
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

