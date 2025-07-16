/*
 * =================================================================
 * == FILE: src/screens/admin/RoleListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all roles.
 */
import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getRolesApi, deleteRoleApi} from '../../api/role';
import {Role} from '@/shared/types';
import RoleListItem from '../../components/userManagement/RoleListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import ConfirmationModal from '../../../shared/components/common/ConfirmationModal';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import {StackNavigationProp} from '@react-navigation/stack';
import Breadcrumb from "@/admin/components/common/Breadcrumb";
import ListHeader from "@/admin/components/common/ListHeader";

type AdminStackParamList = {
    RoleList: undefined;
    CreateRole: undefined;
    EditRole: { role: Role };
};
type RoleListScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'RoleList'>;

const RoleListScreen = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
    const navigation = useNavigation<RoleListScreenNavigationProp>();

    const fetchRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getRolesApi();
            if (response.data && response.data.status === 1) {
                setRoles(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch roles');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRoles();
        }, [])
    );

    const handleDeletePress = (role: Role) => {
        setRoleToDelete(role);
        setModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (roleToDelete) {
            deleteRole(roleToDelete.groupId);
        }
        setModalVisible(false);
        setRoleToDelete(null);
    };

    const handleCancelDelete = () => {
        setModalVisible(false);
        setRoleToDelete(null);
    };

    const deleteRole = async (roleId: number) => {
        try {
            const response = await deleteRoleApi(roleId);
            if (response.data && response.data.status === 1) {
                fetchRoles();
            } else {
                throw new Error(response.data.message || 'Failed to delete role.');
            }
        } catch (err: any) {
            setError(err.message);
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
            <Breadcrumb path={['Roles', 'Manage Roles']}/>
            <ListHeader
                itemCount={roles.length}
                itemType="Rolles"
                createButton={
                    <AppButton title="Create Role" onPress={() => navigation.navigate('CreateRole')}/>
                }
            />
            <View style={styles.header}>
                <AppButton title="Create New Role" onPress={() => navigation.navigate('CreateRole')}/>
            </View>
            <FlatList
                data={roles}
                keyExtractor={(item) => item.groupId.toString()}
                renderItem={({item}) => (
                    <RoleListItem
                        role={item}
                        onPress={() => navigation.navigate('EditRole', {role: item})} // We will implement this next
                        onDelete={() => handleDeletePress(item)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No roles found.</Text>
                    </View>
                }
            />
            {roleToDelete && (
                <ConfirmationModal
                    visible={isModalVisible}
                    title="Delete Role"
                    message={`Are you sure you want to delete the role "${roleToDelete.name}"?`}
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

export default RoleListScreen;
