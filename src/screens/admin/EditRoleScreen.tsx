/*
 * =================================================================
 * == FILE: src/screens/admin/EditRoleScreen.tsx
 * =================================================================
 *
 * A new screen for editing an existing role.
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { updateRoleApi } from '../../api/role';
import { Role, UpdateRole } from '../../types';
import { colors } from '../../styles/colors';
import AppButton from '../../components/common/AppButton';
import ErrorText from '../../components/common/ErrorText';
import RoleDetailForm from '../../components/admin/RoleDetailForm';

type ParamList = {
    EditRole: {
        role: Role;
    };
};

const EditRoleScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'EditRole'>>();
    const { role } = route.params;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<UpdateRole>>({});

    useEffect(() => {
        setForm({
            name: role.name,
            status: role.isActive,
        });
    }, [role]);

    const handleInputChange = (name: keyof UpdateRole, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateRole = async () => {
        if (!form.name) {
            setError('Role name is required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const payload: UpdateRole = {
                name: form.name,
                status: form.status === 1 ? 1 : 0,
            };
            const response = await updateRoleApi(role.groupId, payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Role updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to update role.');
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
                <RoleDetailForm form={form} onInputChange={handleInputChange} />
                {error && <ErrorText message={error} />}
                <AppButton title="Update Role" onPress={handleUpdateRole} loading={loading} />
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

export default EditRoleScreen;
