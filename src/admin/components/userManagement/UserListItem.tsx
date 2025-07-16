/*
 * =================================================================
 * == FILE: src/components/admin/UserListItem.tsx
 * =================================================================
 *
 * A component for rendering a single row in the User List.
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {User} from '@/shared/types';
import {colors} from '@/shared/styles/colors';

interface UserListItemProps {
    user: User;
    onPress: () => void;
    onDelete: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({user, onPress, onDelete}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.roleContainer}>
                <Text style={styles.roleText}>{user.usergroup.name}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    email: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    roleContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: colors.primary,
        borderRadius: 15,
    },
    roleText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: 10,
    },
    deleteButtonText: {
        fontSize: 20,
        color: colors.danger,
    },
});

export default UserListItem;
