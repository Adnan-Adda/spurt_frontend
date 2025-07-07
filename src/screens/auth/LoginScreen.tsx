/*
 * =================================================================
 * == FILE: src/screens/auth/LoginScreen.tsx
 * =================================================================
 *
 * This screen presents the login form to the user.
 * It uses the AuthContext to call the login function.
 */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import LoginForm from '../../components/auth/LoginForm';
import { AuthContext } from '../../state/AuthContext';
import { colors } from '../../styles/colors';

const LoginScreen = () => {
    const { login, isLoading, error } = useContext(AuthContext);

    return (
        <SafeAreaView style={loginScreenStyles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={loginScreenStyles.container}
            >
                <View style={loginScreenStyles.innerContainer}>
                    <Text style={loginScreenStyles.title}>Welcome Back</Text>
                    <Text style={loginScreenStyles.subtitle}>Admin Panel Login</Text>
                    <LoginForm onSubmit={login} loading={isLoading} error={error} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const loginScreenStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 30,
    },
});

export default LoginScreen;