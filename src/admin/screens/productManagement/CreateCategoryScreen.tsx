/*
 * =================================================================
 * == FILE: src/screens/admin/CreateCategoryScreen.tsx
 * =================================================================
 */
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createCategoryApi} from '../../api/category';
import {NewCategory} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import CategoryDetailForm from '../../components/productManagement/CategoryDetailForm';
import {parseApiError} from '@/shared/utils/errorHandler';

const CreateCategoryScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<NewCategory>({
        name: '',
        parentInt: 0, // Default to root category
        sortOrder: 0,
        status: 1,
        image: '',
    });
    const navigation = useNavigation();

    const handleInputChange = (name: keyof NewCategory, value: string | number | any) => {
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleCreateCategory = async () => {
        if (!form.name) {
            setError('Category name is required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await createCategoryApi(form);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Category created successfully!', [
                    {text: 'OK', onPress: () => navigation.goBack()},
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to create category.');
            }
        } catch (err: any) {
            const errorMessage = parseApiError(err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <CategoryDetailForm form={form} onInputChange={handleInputChange}/>
                {error && <ErrorText message={error}/>}
                <AppButton title="Create Category" onPress={handleCreateCategory} loading={loading}/>
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
        flex: 1,
        padding: 20,
    },
});

export default CreateCategoryScreen;
