import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert, View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {sellerService} from '../../api/seller';
import {NewSeller} from '@/shared/types/seller.types';
import {colors} from '@/shared/styles/colors';
import {parseApiError} from '@/shared/utils/errorHandler';
import SellerRegistrationForm from '../../components/auth/SellerRegistrationForm';
import ErrorText from '@/shared/components/common/ErrorText';

const SellerRegistrationScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const handleRegister = async (values: NewSeller) => {
        setIsSubmitting(true);
        setSubmissionError(null);
        try {
            // The 'values' object comes directly from the Formik form
            await sellerService.register(values);

            Alert.alert(
                'Registration Successful',
                'Your account has been created. Please log in.',
                [{text: 'OK', onPress: () => navigation.navigate('SellerLogin')}] // Navigate to login screen
            );

        } catch (err: any) {
            const errorMessage = parseApiError(err);
            setSubmissionError(errorMessage);
            Alert.alert('Registration Failed', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Seller Account</Text>
                        <Text style={styles.subtitle}>Join our platform and start selling today.</Text>
                    </View>

                    <SellerRegistrationForm
                        onSubmit={handleRegister}
                        isSubmitting={isSubmitting}
                    />

                    {submissionError && <ErrorText message={submissionError}/>}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.darkGray,
        textAlign: 'center',
        marginTop: 8,
    },
});
export default SellerRegistrationScreen;
