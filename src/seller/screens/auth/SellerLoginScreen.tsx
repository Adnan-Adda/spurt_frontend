import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '@/shared/styles/colors';
import SellerLoginForm from '../../components/auth/SellerLoginForm';
import { SellerAuthStackParamList } from '../../navigation/SellerAuthStack';

type NavigationProp = StackNavigationProp<SellerAuthStackParamList, 'SellerLogin'>;

const SellerLoginScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Seller Portal</Text>
                    <Text style={styles.subtitle}>Welcome back! Please log in to your account.</Text>
                </View>

                <SellerLoginForm />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SellerRegister')}>
                        <Text style={[styles.footerText, styles.linkText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => {/* TODO: Navigate to Forgot Password */}}>
                        <Text style={[styles.footerText, styles.linkText]}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subtitle: {
        fontSize: 16,
        color: colors.darkGray,
        marginTop: 8,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: colors.darkGray,
    },
    linkText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
});

export default SellerLoginScreen;
