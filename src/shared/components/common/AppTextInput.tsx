/*
* =================================================================
* == FILE: src/components/common/AppTextInput.tsx
* =================================================================
*/
import React from 'react';
import {TextInput, StyleSheet, View, Text, KeyboardTypeOptions} from 'react-native';
import {colors} from '../../styles/colors';

interface AppTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: string;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
    numberOfLines?: number;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
                                                       label,
                                                       value,
                                                       onChangeText = () => {},
                                                       placeholder = '',
                                                       secureTextEntry = false,
                                                       error = null,
                                                       keyboardType = 'default',
                                                       multiline = false,
                                                       numberOfLines = 1,
                                                   }) => {
    return (
        <View style={textInputStyles.container}>
            <Text style={textInputStyles.label}>{label}</Text>
            <TextInput
                style={[textInputStyles.input, error ? textInputStyles.inputError : null]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                multiline={multiline}
                numberOfLines={multiline ? numberOfLines : 1}
                keyboardType={keyboardType}
            />
            {error && <Text style={textInputStyles.errorText}>{error}</Text>}
        </View>
    );
};

const textInputStyles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: 16,
        color: colors.text,
    },
    inputError: {
        borderColor: colors.danger,
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        marginTop: 5,
    },
});

export default AppTextInput;
