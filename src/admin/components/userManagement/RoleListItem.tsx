/*
 * =================================================================
 * == FILE: src/components/admin/RoleListItem.tsx
 * =================================================================
 *
 * A new component for rendering a single row in the Role List.
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Role} from '@/shared/types';
import {colors} from '@/shared/styles/colors';

interface RoleListItemProps {
    role: Role;
    onPress: () => void;
    onDelete: () => void;
}

const RoleListItem: React.FC<RoleListItemProps> = ({role, onPress, onDelete}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{role.name}</Text>
            </View>
            <View style={styles.statusContainer}>
                <View
                    style={[styles.statusIndicator, {backgroundColor: role.isActive ? colors.success : colors.danger}]}/>
                <Text style={styles.statusText}>{role.isActive ? 'Active' : 'Inactive'}</Text>
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    statusText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    deleteButton: {
        padding: 10,
    },
    deleteButtonText: {
        fontSize: 20,
        color: colors.danger,
    },
});

export default RoleListItem;
