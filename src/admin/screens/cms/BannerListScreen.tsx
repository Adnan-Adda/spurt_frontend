/*
 * =================================================================
 * == FILE: src/admin/screens/cms/BannerListScreen.tsx
 * =================================================================
 */
import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {bannerService} from '../../api/banner';
import {Banner} from '@/shared/types';
import BannerListItem from '../../components/cms/BannerListItem';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import ErrorText from '../../../shared/components/common/ErrorText';
import AppButton from '../../../shared/components/common/AppButton';
import Breadcrumb from '../../components/common/Breadcrumb';
import ListHeader from '../../components/common/ListHeader';
import {parseApiError} from '@/shared/utils/errorHandler';
import ConfirmationModal from "@/shared/components/common/ConfirmationModal";
import Pagination from "@/shared/components/common/Pagination";


type CMSStackParamList = {
    BannerList: undefined;
    CreateBanner: undefined;
    EditBanner: { bannerId: number };
};
type BannerListNavigationProp = StackNavigationProp<CMSStackParamList, 'BannerList'>;

const BannerListScreen = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
    const navigation = useNavigation<BannerListNavigationProp>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const fetchBanners = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const offset = (page - 1) * itemsPerPage;
            const response = await bannerService.getBanners({limit: itemsPerPage, offset: offset});
            const response_count = await bannerService.getBanners({limit: 0, offset: 0, count: true})
            setBanners(response.data);
            setTotalItems(response_count.data);
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchBanners(currentPage);
        }, [currentPage, fetchBanners])
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleDeletePress = (banner: Banner) => {
        setBannerToDelete(banner);
        setModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (bannerToDelete) {
            deleteBanner(bannerToDelete.bannerId);
        }
        setModalVisible(false);
        setBannerToDelete(null);
    };

    const deleteBanner = async (bannerId: number) => {
        try {
            const response = await bannerService.deleteBanner(bannerId);
            fetchBanners(currentPage);
        } catch (err: any) {
            setError(parseApiError(err));
        }
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <ErrorText message={error}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Breadcrumb path={['CMS', 'Manage Banners']}/>
            <ListHeader
                itemCount={banners.length}
                itemType="Banners"
                createButton={
                    <AppButton title="Create Banner" onPress={() => navigation.navigate('CreateBanner')}/>
                }
            />
            <FlatList
                data={banners}
                keyExtractor={(item) => item.bannerId.toString()}
                renderItem={({item}) => (
                    <BannerListItem
                        banner={item}
                        onPress={() => navigation.navigate('EditBanner', {bannerId: item.bannerId})}
                        onDelete={() => handleDeletePress(item)}
                    />
                )}
                ListFooterComponent={
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text>No banners found.</Text>
                    </View>
                }
            />
            {bannerToDelete && (
                <ConfirmationModal
                    visible={isModalVisible}
                    title="Delete Banner"
                    message={`Are you sure you want to delete "${bannerToDelete.title}"?`}
                    onCancel={() => setModalVisible(false)}
                    onConfirm={handleConfirmDelete}
                    confirmButtonText="Delete"
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default BannerListScreen;
