import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/shared/styles/colors';

interface RadioButtonOption {
    label: string;
    value: string;
}

interface RadioButtonGroupProps {
    label: string;
    options: RadioButtonOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    error?: string | false;
    touched?: boolean;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
                                                               label,
                                                               options,
                                                               selectedValue,
                                                               onValueChange,
                                                               error,
                                                               touched,
                                                           }) => {
    const showError = touched && error;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={styles.option}
                        onPress={() => onValueChange(option.value)}
                    >
                        <View style={[styles.radioCircle, showError ? styles.errorBorder : {}]}>
                            {selectedValue === option.value && <View style={styles.selectedRb} />}
                        </View>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {showError && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 8,
        fontWeight: '600',
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    optionLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: colors.text,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    errorBorder: {
        borderColor: colors.danger,
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        marginTop: 5,
    },
});

export default RadioButtonGroup;
