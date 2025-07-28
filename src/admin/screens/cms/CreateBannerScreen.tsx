/*
 * =================================================================
 * == FILE: src/admin/screens/cms/CreateBannerScreen.tsx (MODIFIED)
 * =================================================================
 *
 */
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {bannerService} from '../../../shared/api/banner';
import {NewBanner} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import BannerDetailForm from '../../components/cms/BannerDetailForm';
import {parseApiError} from '@/shared/utils/errorHandler';

const CreateBannerScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<NewBanner>>({
        title: '',
        link: '',
        content: '',
        position: 0,
        status: 1,
        bannerImage: [{image: '', containerName: '', isPrimary: 1}],
    });
    const navigation = useNavigation();

    const handleInputChange = (name: keyof NewBanner, value: string | number) => {
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleImageChange = (field: 'image' | 'containerName', value: string) => {
        setForm(prev => {
            const newBannerImage = [...(prev.bannerImage || [])];
            newBannerImage[0] = {...newBannerImage[0], [field]: value};
            return {...prev, bannerImage: newBannerImage};
        });
    };


    const handleCreateBanner = async () => {
        if (!form.title) {
            setError('Banner title is required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await bannerService.createBanner(form as NewBanner);
            Alert.alert('Success', 'Banner created successfully!', [
                {text: 'OK', onPress: () => navigation.goBack()},
            ]);
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <BannerDetailForm
                    form={form}
                    onInputChange={handleInputChange}
                    onImageChange={handleImageChange}
                />
                {error && <ErrorText message={error}/>}
                <AppButton title="Create Banner" onPress={handleCreateBanner} loading={loading}/>
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

export default CreateBannerScreen;
