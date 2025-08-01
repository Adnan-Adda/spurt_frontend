import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    style?: StyleProp<ViewStyle>;
}

const AppButton: React.FC<AppButtonProps> = ({
                                                 title,
                                                 onPress,
                                                 loading,
                                                 disabled,
                                                 variant = 'primary',
                                                 style,
                                             }) => {
    // Determine button and text styles based on the variant
    const buttonVariantStyle = styles[variant] || styles.primary;
    const textVariantStyle = styles[`${variant}Text`] || styles.primaryText;

    return (
        <TouchableOpacity
            // Combine the base, variant, disabled, and custom styles
            style={[
                styles.button,
                buttonVariantStyle,
                (disabled || loading) && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={[styles.text, textVariantStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: '100%',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    primary: {
        backgroundColor: colors.primary,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    primaryText: {
        color: '#fff',
    },
    secondary: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    secondaryText: {
        color: colors.primary,
    },
    danger: {
        backgroundColor: colors.danger,
    },
    dangerText: {
        color: '#fff',
    },
    disabled: {
        backgroundColor: colors.disabled,
        borderColor: colors.disabled,
    },
});

export default AppButton;
