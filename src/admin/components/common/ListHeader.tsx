/*
 * =================================================================
 * == FILE: src/admin/components/common/ListHeader.tsx
 * =================================================================
 *
 * A new reusable header/toolbar for our list screens. It includes
 * placeholders for count, search, and filters.
 */
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '@/shared/styles/colors';

interface ListHeaderProps {
    itemCount: number;
    itemType: string; // e.g., "Sellers", "Roles"
    createButton: React.ReactNode;
}

const ListHeader: React.FC<ListHeaderProps> = ({itemCount, itemType, createButton}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.countText}>{itemCount} {itemType}</Text>
            <View style={styles.actionsContainer}>
                {/* Placeholder for Search */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={colors.textSecondary}/>
                    <TextInput placeholder={`Search ${itemType}...`} style={styles.searchInput}/>
                </View>
                {/* Placeholder for Filter */}
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter" size={20} color={colors.primary}/>
                </TouchableOpacity>
                {createButton}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 10,
    },
    searchInput: {
        height: 40,
        marginLeft: 8,
    },
    filterButton: {
        padding: 8,
        marginRight: 10,
    },
});

export default ListHeader;
