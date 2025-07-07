/*
 * =================================================================
 * == FILE: src/screens/LoadingScreen.tsx
 * =================================================================
 *
 * This screen is shown briefly when the app starts, while it
 * checks for a stored authentication token.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { colors } from '../styles/colors';

const LoadingScreen = () => (
    <View style={loadingScreenStyles.container}>
        <LoadingSpinner />
    </View>
);

const loadingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingScreen;



