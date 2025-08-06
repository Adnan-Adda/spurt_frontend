/*
 * =================================================================
 * == FILE: src/admin/screens/orders/OrderDetailScreen.tsx
 * =================================================================
 */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text, Alert} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {getOrderDetailApi, changeOrderStatusApi} from '../../api/order';
import {getOrderStatusListApi} from '../../api/order';
import {OrderDetail, OrderProduct, OrderStatus} from '@/shared/types';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '@/shared/styles/colors';
import {parseApiError} from '@/shared/utils/errorHandler';
import AppButton from '../../../shared/components/common/AppButton';

type OrderStackParamList = {
    OrderDetail: { orderId: number };
};

const OrderDetailScreen = () => {
    const route = useRoute<RouteProp<OrderStackParamList, 'OrderDetail'>>();
    const {orderId} = route.params;

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
    const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const orderResponse = await getOrderDetailApi(orderId);
            if (orderResponse.data && orderResponse.data.status === 1) {
                const orderData = orderResponse.data.data;
                setOrder(orderData);
                setSelectedStatusId(orderData.orderStatusId);
            } else {
                throw new Error(orderResponse.data.message || 'Failed to fetch order details');
            }

            const statusResponse = await getOrderStatusListApi();
            if (statusResponse.data && statusResponse.data.status === 1) {
                setOrderStatuses(statusResponse.data.data);
            } else {
                throw new Error(statusResponse.data.message || 'Failed to fetch order statuses');
            }

        } catch (err) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const handleUpdateStatus = async () => {
        if (!selectedStatusId) {
            Alert.alert('Error', 'Please select a status.');
            return;
        }
        setUpdateLoading(true);
        try {
            const response = await changeOrderStatusApi(orderId, selectedStatusId);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Order status updated successfully.');
                // Refresh the details
                fetchOrderDetails();
            } else {
                throw new Error(response.data.message || 'Failed to update status.');
            }
        } catch (err) {
            Alert.alert('Error', parseApiError(err));
        } finally {
            setUpdateLoading(false);
        }
    };

    const renderProductItem = (item: OrderProduct, index: number) => (
        <View key={item.orderProductId} style={styles.productRow}>
            <Text style={[styles.productCell, {flex: 2}]}>{item.name}</Text>
            <Text style={styles.productCell}>{item.quantity}</Text>
            <Text style={styles.productCell}>${parseFloat(item.productPrice).toFixed(2)}</Text>
            <Text style={[styles.productCell, {textAlign: 'right'}]}>${parseFloat(item.total).toFixed(2)}</Text>
        </View>
    );

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error || !order) {
        return <ErrorText message={error || 'Order details could not be loaded.'}/>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.orderId}>Order #{order.orderPrefixId}</Text>
                    <View
                        style={[styles.statusBadge, {backgroundColor: order.orderStatus?.colorCode || colors.disabled}]}>
                        <Text style={styles.statusText}>{order.orderStatus?.name || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Change Status</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedStatusId}
                            onValueChange={(itemValue) => setSelectedStatusId(itemValue)}
                        >
                            {orderStatuses.map(status => (
                                <Picker.Item key={status.orderStatusId} label={status.name}
                                             value={status.orderStatusId}/>
                            ))}
                        </Picker>
                    </View>
                    <AppButton title="Update Status" onPress={handleUpdateStatus} loading={updateLoading}/>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Customer & Shipping Details</Text>
                    <Text style={styles.detailText}>{order.shippingFirstname} {order.shippingLastname}</Text>
                    <Text style={styles.detailText}>{order.email}</Text>
                    <Text style={styles.detailText}>{order.telephone}</Text>
                    <View style={styles.separator}/>
                    <Text style={styles.detailText}>{order.shippingAddress1}</Text>
                    {order.shippingAddress2 && <Text style={styles.detailText}>{order.shippingAddress2}</Text>}
                    <Text
                        style={styles.detailText}>{order.shippingCity}, {order.shippingZone} {order.shippingPostcode}</Text>
                    <Text style={styles.detailText}>{order.shippingCountry}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Products</Text>
                    <View style={styles.productHeader}>
                        <Text style={[styles.productHeaderText, {flex: 2}]}>Product</Text>
                        <Text style={styles.productHeaderText}>Qty</Text>
                        <Text style={styles.productHeaderText}>Price</Text>
                        <Text style={[styles.productHeaderText, {textAlign: 'right'}]}>Total</Text>
                    </View>
                    {order.productList.map(renderProductItem)}
                </View>
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
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    orderId: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        margin: 20,
        marginBottom: 0,
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    separator: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
    },
    productHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.border,
        paddingBottom: 10,
        marginBottom: 10,
    },
    productHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        color: colors.text,
    },
    productRow: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    productCell: {
        flex: 1,
        fontSize: 14,
    },
    pickerContainer: {
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 15,
    },
});

export default OrderDetailScreen;