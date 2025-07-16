/*
 * =================================================================
 * == FILE: src/components/admin/ProductListItem.tsx
 * =================================================================
 *
 * A component for rendering a single row in the Product List.
 */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Product} from '@/shared/types';
import {Feather} from '@expo/vector-icons';
import {colors} from '@/shared/styles/colors';

interface ProductListItemProps {
    product: Product;
    onDelete: () => void;
    onPress: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({product, onPress, onDelete}) => {
    // Use a placeholder if no image is available
    const imageUrl = product.productImage?.[0]?.image
        ? `http://localhost:8000/api/media/resize-image?width=100&height=100&path=${product.productImage[0].containerName}&name=${product.productImage[0].image}`
        : 'https://placehold.co/100x100/e9ecef/495057?text=No+Image';

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={{uri: imageUrl}}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.sku}>SKU: {product.sku}</Text>
                <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
            </View>
            <View style={styles.statusContainer}>
                <View
                    style={[styles.statusIndicator, {backgroundColor: product.isActive ? colors.success : colors.danger}]}/>
                <Text style={styles.statusText}>{product.isActive ? 'Active' : 'Inactive'}</Text>
            </View>
            {/* --- ADDED DELETE BUTTON --- */}
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Feather name="trash-2" size={20} color={colors.danger}/>
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
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
    },
    sku: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
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
});

export default ProductListItem;
