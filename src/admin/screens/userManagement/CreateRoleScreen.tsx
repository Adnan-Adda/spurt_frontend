/*
 * =================================================================
 * == FILE: src/screens/admin/CreateRoleScreen.tsx
 * =================================================================
 *
 * A new screen for creating a user role.
 */
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createRoleApi} from '../../api/role';
import {NewRole} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import RoleDetailForm from '../../components/userManagement/RoleDetailForm';

const CreateRoleScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<NewRole>({
        name: '',
        status: 1, // Default to active
    });
    const navigation = useNavigation();

    const handleInputChange = (name: keyof NewRole, value: string | number) => {
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleCreateRole = async () => {
        if (!form.name) {
            setError('Role name is required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await createRoleApi(form);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Role created successfully!', [
                    {text: 'OK', onPress: () => navigation.goBack()},
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to create role.');
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
                <RoleDetailForm form={form} onInputChange={handleInputChange}/>
                {error && <ErrorText message={error}/>}
                <AppButton title="Create Role" onPress={handleCreateRole} loading={loading}/>
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

export default CreateRoleScreen;
