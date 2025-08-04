import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/shared/state/AuthContext';
import AppTextInput from '@/shared/components/common/AppTextInput';
import AppButton from '@/shared/components/common/AppButton';
import {LoginCredentials} from '@/shared/types';
import ErrorText from '@/shared/components/common/ErrorText';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const SellerLoginForm = () => {
    const { login, isInitialLoading, error } = useAuth();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const credentials: LoginCredentials = {
                username: values.email,
                password: values.password,
            };
            try {
                await login(credentials, 'seller');
            } catch (e) {
                // TODO: For production, replace this with a remote logging service (e.g., Sentry, LogRocket)
                // This allows you to track errors that real users are experiencing.
            }
        },
    });

    return (
        <View>
            <AppTextInput
                label="Email Address"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                error={formik.touched.email && formik.errors.email}
                touched={formik.touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <AppTextInput
                label="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                error={formik.touched.password && formik.errors.password}
                touched={formik.touched.password}
                secureTextEntry
            />
            {error && <ErrorText message={error} />}
            <AppButton
                title="Login"
                onPress={() => formik.handleSubmit()}
                loading={formik.isSubmitting || isInitialLoading}
                style={styles.loginButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loginButton: {
        marginTop: 20,
    }
});

export default SellerLoginForm;
