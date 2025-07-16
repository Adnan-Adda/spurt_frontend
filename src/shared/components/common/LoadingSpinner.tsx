/*
 * =================================================================
 * == FILE: src/components/common/LoadingSpinner.tsx
 * =================================================================
 *
 * A simple loading spinner for indicating background activity.
 */
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

const LoadingSpinner = () => (
    <View style={loadingSpinnerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary}/>
    </View>
);

const loadingSpinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingSpinner;