/*
 * =================================================================
 * == FILE: src/components/admin/DashboardModuleCard.tsx
 * =================================================================
 *
 * A new component for the main dashboard. Each card represents a
 * major administrative module, like "Products" or "Users".
 */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors} from '@/shared/styles/colors';

interface DashboardModuleCardProps {
    title: string;
    description: string;
    onPress: () => void;
}

const DashboardModuleCard: React.FC<DashboardModuleCardProps> = ({title, description, onPress}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});

export default DashboardModuleCard;
