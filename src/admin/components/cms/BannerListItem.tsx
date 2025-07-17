/*
 * =================================================================
 * == FILE: src/admin/components/cms/BannerListItem.tsx
 * =================================================================
 *
 * A component for rendering a single row in the Banner List.
 */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Banner} from '@/shared/types';
import {colors} from '@/shared/styles/colors';

interface BannerListItemProps {
    banner: Banner;
    onPress: () => void;
    onDelete: () => void;
}

const BannerListItem: React.FC<BannerListItemProps> = ({banner, onPress, onDelete}) => {
    const imageUrl = banner.image
        ? `http://localhost:8000/api/media/resize-image?width=100&height=100&path=${banner.imagePath}&name=${banner.image}`
        : 'https://placehold.co/100x100/e9ecef/495057?text=No+Image';

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={{uri: imageUrl}}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>{banner.title}</Text>
                <Text style={styles.link} numberOfLines={1}>Link: {banner.link}</Text>
            </View>
            <View style={styles.statusContainer}>
                <View
                    style={[styles.statusIndicator, {backgroundColor: banner.isActive ? colors.success : colors.danger}]}/>
                <Text style={styles.statusText}>{banner.isActive ? 'Active' : 'Inactive'}</Text>
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
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    link: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    statusContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
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

export default BannerListItem;
