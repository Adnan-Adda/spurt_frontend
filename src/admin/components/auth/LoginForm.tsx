import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAuth} from '../../../shared/state/AuthContext';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import {LoginCredentials} from '@/shared/types';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
    const {login, isLoading, error} = useAuth();

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const credentials: LoginCredentials = {
                username: values.email, // The API expects 'username' for the email
                password: values.password,
            };
            try {
                // Call the login function and explicitly pass 'admin'
                await login(credentials, 'admin');
                // Navigation will be handled by the RootNavigator upon successful login
            } catch (e) {
                // The error is already set in the AuthContext, so we don't need to do anything here.
                // Formik's `isSubmitting` will automatically be reset.
            }
        },
    });

    return (
        <View style={loginFormStyles.container}>
            <AppTextInput
                label="Email Address"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                placeholder="admin@example.com"
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
                placeholder="Enter your password"
                secureTextEntry
                error={formik.touched.password && formik.errors.password}
                touched={formik.touched.password}
            />
            {/* Display the global login error from the context */}
            {error && <ErrorText message={error}/>}
            <AppButton
                title="Login"
                onPress={() => formik.handleSubmit()}
                loading={formik.isSubmitting || isLoading}
            />
        </View>
    );
};

const loginFormStyles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default LoginForm;
