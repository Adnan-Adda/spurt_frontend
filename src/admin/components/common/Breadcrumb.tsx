/*
 * =================================================================
 * == FILE: src/admin/components/common/Breadcrumb.tsx
 * =================================================================
 *
 * A new component to display the navigation path (breadcrumbs).
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '@/shared/styles/colors';

interface BreadcrumbProps {
    path: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({path}) => {
    return (
        <View style={styles.container}>
            {path.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Text style={index === path.length - 1 ? styles.textActive : styles.textInactive}>
                        {item}
                    </Text>
                    {index < path.length - 1 && (
                        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary}
                                  style={styles.separator}/>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInactive: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    textActive: {
        fontSize: 14,
        color: colors.text,
        fontWeight: 'bold',
    },
    separator: {
        marginHorizontal: 4,
    },
});

export default Breadcrumb;
