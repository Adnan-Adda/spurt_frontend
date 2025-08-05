import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../styles/colors';
import AppButton from '../components/common/AppButton';
import Constants from 'expo-constants';


type RootStackParamList = {
    Storefront: undefined;
    SellerAuth: undefined;
    AdminAuth: undefined;
};

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const LandingScreen = () => {
    const navigation = useNavigation<LandingScreenNavigationProp>();
    const APP_VARIANT = Constants.expoConfig?.extra?.APP_VARIANT;
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* You can replace this with your actual logo */}
                    <Image
                        source={{uri: 'https://placehold.co/150x150/007bff/ffffff?text=Logo'}}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Welcome to MarketWise</Text>
                    <Text style={styles.subtitle}>Your one-stop marketplace solution.</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <AppButton
                        title="🛍️ Shop Now"
                        onPress={() => navigation.navigate('Storefront')}
                        variant="primary"
                        style={styles.button}
                    />
                    <AppButton
                        title="💼 Seller Portal"
                        onPress={() => navigation.navigate('SellerAuth')}
                        variant="secondary"
                        style={styles.button}
                    />
                </View>

                {
                    APP_VARIANT === 'admin' && (
                        <View style={styles.footer}>
                            <Text style={styles.footerText} onPress={() => navigation.navigate('AdminAuth')}>
                                Administrator Login
                            </Text>
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subtitle: {
        fontSize: 16,
        color: colors.darkGray,
        marginTop: 8,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 400,
    },
    button: {
        marginVertical: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        fontSize: 14,
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});

export default LandingScreen;

