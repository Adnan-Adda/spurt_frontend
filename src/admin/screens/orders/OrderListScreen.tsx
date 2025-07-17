/*
 * =================================================================
 * == FILE: src/admin/screens/orders/OrderListScreen.tsx
 * =================================================================
 *
 * This screen fetches and displays a list of all orders.
 */
import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getOrderListApi} from '../../api/order';
import {Order} from '@/shared/types';
import OrderListItem from '../../components/orders/OrderListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import {colors} from '../../../shared/styles/colors';
import Breadcrumb from '../../components/common/Breadcrumb';
import {parseApiError} from '@/shared/utils/errorHandler';

type OrderStackParamList = {
    OrderList: undefined;
    OrderDetail: { orderId: number, orderPrefixId: string };
};
type OrderListNavigationProp = StackNavigationProp<OrderStackParamList, 'OrderList'>;

const OrderListScreen = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<OrderListNavigationProp>();

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getOrderListApi(50, 0);
            if (response.data && response.data.status === 1) {
                setOrders(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch orders');
            }
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [])
    );

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
            <Breadcrumb path={['Orders', 'Manage Orders']}/>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.orderId.toString()}
                renderItem={({item}) => (
                    <OrderListItem
                        order={item}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: item.orderId, orderPrefixId: item.orderPrefixId })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No orders found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default OrderListScreen;
