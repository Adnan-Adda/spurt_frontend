/*
 * =================================================================
 * == FILE: src/components/admin/StatCard.tsx
 * =================================================================
 *
 * A reusable UI component to display a single statistic on the
 * dashboard, such as "Total Sales" or "Total Customers".
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors} from '@/shared/styles/colors';

interface StatCardProps {
    title: string;
    value: string | number;
    loading?: boolean;
    onPress?: () => void; // <-- ADDED: Make the card pressable
}

const StatCard: React.FC<StatCardProps> = ({title, value, loading, onPress}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress || loading}>
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary}/>
            ) : (
                <>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.content}>
                        <Text style={styles.value}>{value}</Text>
                    </View>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 4,
        flex: 1,
        minWidth: '100%', // Let the parent control the width
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
    },
});

export default StatCard;
