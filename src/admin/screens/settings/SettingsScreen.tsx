/*
 * =================================================================
 * == FILE: src/admin/screens/settings/SettingsScreen.tsx
 * =================================================================
 */
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';

type SettingsStackParamList = {
    SettingsMenu: undefined;
    StoreSettings: undefined;
};
type SettingsScreenNavigationProp = StackNavigationProp<SettingsStackParamList, 'SettingsMenu'>;

const SettingsScreen = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <AppButton
                    title="Store Settings"
                    onPress={() => navigation.navigate('StoreSettings')}
                />
                {/* We will add more settings buttons here later */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
});

export default SettingsScreen;
