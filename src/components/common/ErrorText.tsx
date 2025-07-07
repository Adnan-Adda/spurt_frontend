
/*
 * =================================================================
 * == FILE: src/components/common/ErrorText.tsx
 * =================================================================
 *
 * A component to display API or form error messages.
 */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface ErrorTextProps {
    message: string | null;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
    if (!message) return null;
    return <Text style={errorTextStyles.error}>{message}</Text>;
};

const errorTextStyles = StyleSheet.create({
    error: {
        color: colors.danger,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default ErrorText;