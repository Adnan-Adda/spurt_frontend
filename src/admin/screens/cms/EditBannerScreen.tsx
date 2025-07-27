/*
 * =================================================================
 * == FILE: src/admin/screens/cms/EditBannerScreen.tsx
 * =================================================================
 */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {getBannerDetailApi, updateBannerApi} from '../../../shared/api/banner';
import {Banner, UpdateBanner, NewBannerImage} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import AppButton from '../../../shared/components/common/AppButton';
import ErrorText from '../../../shared/components/common/ErrorText';
import BannerDetailForm from '../../components/cms/BannerDetailForm';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import {parseApiError} from '@/shared/utils/errorHandler';

type ParamList = {
    EditBanner: {
        bannerId: number;
    };
};

const EditBannerScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'EditBanner'>>();
    const {bannerId} = route.params;

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<UpdateBanner>>({});

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await getBannerDetailApi(bannerId);
                if (response.data && response.data.status === 1) {
                    const bannerData: Banner = response.data.data;

                    // --- THIS IS THE KEY FIX ---
                    // Map the API response structure (bannerImages) to the structure our form expects (bannerImage)
                    const mappedImages: NewBannerImage[] = bannerData.bannerImages?.map(img => ({
                        image: img.imageName, // We can pre-fill with the name, but user will provide new base64
                        containerName: img.imagePath,
                        isPrimary: img.isPrimary,
                    })) || [{image: '', containerName: '', isPrimary: 1}];

                    setForm({
                        title: bannerData.title,
                        content: bannerData.content,
                        link: bannerData.link,
                        position: bannerData.position,
                        status: bannerData.isActive,
                        bannerImage: mappedImages,
                    });
                } else {
                    throw new Error('Failed to load banner details');
                }
            } catch (e: any) {
                setError(parseApiError(e));
            } finally {
                setPageLoading(false);
            }
        };
        loadInitialData();
    }, [bannerId]);

    const handleInputChange = (name: keyof UpdateBanner, value: string | number) => {
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleImageChange = (field: 'image' | 'containerName', value: string) => {
        setForm(prev => {
            const newBannerImage = [...(prev.bannerImage || [])];
            newBannerImage[0] = {...newBannerImage[0], [field]: value};
            return {...prev, bannerImage: newBannerImage};
        });
    };

    const handleUpdateBanner = async () => {
        if (!form.title) {
            setError('Banner title is required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const payload = {...form, bannerId} as UpdateBanner;
            const response = await updateBannerApi(bannerId, payload);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Banner updated successfully!', [
                    {text: 'OK', onPress: () => navigation.goBack()},
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to update banner.');
            }
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return <LoadingSpinner/>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <BannerDetailForm
                    form={form}
                    onInputChange={handleInputChange}
                    onImageChange={handleImageChange}
                />
                {error && <ErrorText message={error}/>}
                <AppButton title="Update Banner" onPress={handleUpdateBanner} loading={loading}/>
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

export default EditBannerScreen;