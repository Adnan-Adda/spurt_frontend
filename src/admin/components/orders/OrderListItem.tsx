/*
 * =================================================================
 * == FILE: src/admin/components/orders/OrderListItem.tsx
 * =================================================================
 *
 * A component for rendering a single row in the Order List.
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Order} from '@/shared/types';
import {colors} from '@/shared/styles/colors';

interface OrderListItemProps {
    order: Order;
    onPress: () => void;
}

const OrderListItem: React.FC<OrderListItemProps> = ({order, onPress}) => {
    const orderDate = new Date(order.createdDate).toLocaleDateString();
    const orderTotal = `${order.currencySymbolLeft || ''}${parseFloat(order.total).toFixed(2)}${order.currencySymbolRight || ''}`;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.infoContainer}>
                <Text style={styles.orderId}>#{order.orderPrefixId}</Text>
                <Text style={styles.customerName}>{order.shippingFirstname}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.total}>{orderTotal}</Text>
                <Text style={styles.date}>{orderDate}</Text>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: order.orderStatus?.colorCode || colors.disabled}]}>
                <Text style={styles.statusText}>{order.orderStatus?.name || 'N/A'}</Text>
            </View>
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
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
    customerName: {
        fontSize: 14,
        color: colors.text,
        marginTop: 4,
    },
    detailsContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 15,
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default OrderListItem;
