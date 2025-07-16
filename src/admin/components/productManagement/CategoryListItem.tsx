/*
 * =================================================================
 * == FILE: src/components/admin/CategoryListItem.tsx
 * =================================================================
 *
 * A component for rendering a single row in the Category List.
 */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Category } from '@/shared/types';
import { colors } from '@/shared/styles/colors';

interface CategoryListItemProps {
    category: Category;
    onPress: () => void;
    onDelete: () => void;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({ category, onPress, onDelete }) => {
    const imageUrl = category.image
        ? `http://localhost:8000/api/media/resize-image?width=100&height=100&path=${category.imagePath}&name=${category.image}`
        : 'https://placehold.co/100x100/e9ecef/495057?text=No+Image';

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{category.name}</Text>
                <Text style={styles.sortOrder}>Sort Order: {category.sortOrder}</Text>
            </View>
            <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, { backgroundColor: category.isActive ? colors.success : colors.danger }]} />
                <Text style={styles.statusText}>{category.isActive ? 'Active' : 'Inactive'}</Text>
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
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
        backgroundColor: '#f0f0f0',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    sortOrder: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    statusContainer: {
        alignItems: 'center',
        marginLeft: 10,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginBottom: 4,
    },
    statusText: {
        fontSize: 12,
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

export default CategoryListItem;
