/*
 * =================================================================
 * == FILE: src/components/common/AppButton.tsx
 * =================================================================
 *
 * A reusable, styled button component.
 */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../../styles/colors';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({title, onPress, loading, disabled}) => {
    return (
        <TouchableOpacity
            style={[styles.button, (disabled || loading) && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff"/>
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    disabled: {
        backgroundColor: colors.disabled,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AppButton;
