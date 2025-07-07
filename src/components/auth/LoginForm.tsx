/*
 * =================================================================
 * == FILE: src/components/auth/LoginForm.tsx
 * =================================================================
 *
 * The form used in the LoginScreen. It handles user input
 * for email and password and calls the onSubmit function.
 */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppTextInput from '../common/AppTextInput';
import AppButton from '../common/AppButton';
import ErrorText from '../common/ErrorText';
import { LoginCredentials } from '../../types';

interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => void;
    loading: boolean;
    error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });

    const validateAndSubmit = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid.';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            valid = false;
        }

        setFormErrors(newErrors);

        if (valid) {
            onSubmit({ username: email, password });
        }
    };

    return (
        <View style={loginFormStyles.container}>
            <AppTextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="admin@spurtcommerce.com"
                error={formErrors.email}
            />
            <AppTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                error={formErrors.password}
            />
            <ErrorText message={error} />
            <AppButton title="Login" onPress={validateAndSubmit} loading={loading} />
        </View>
    );
};

const loginFormStyles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default LoginForm;
