import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image, ActivityIndicator, Alert} from 'react-native';
import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';
import {mediaService} from '@/admin/api/media';
import {Image as ProductImage, ImageUpload} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import ErrorText from "@/shared/components/common/ErrorText";
// @ts-ignore
import {convertImageToBase64} from "@/shared/utils/ImageConverter";

interface ImageUploadManagerProps {
    initialImages?: ProductImage[];
    onImagesChange: (images: ProductImage[]) => void;
}

const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({initialImages = [], onImagesChange}) => {
    const [images, setImages] = useState<ProductImage[]>(initialImages);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // This syncs the component's state if the initial props arrive asynchronously.
        setImages(initialImages);
    }, [initialImages]);

    const handleSelectImage = async () => {
        setError(null);
        const options: ImageLibraryOptions = {mediaType: 'photo', quality: 0.7};

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                setError(`Error: ${response.errorMessage}`);
                return;
            }

            const asset = response.assets?.[0];
            if (!asset || !asset.uri || !asset.fileName) return;

            setUploading(true);
            try {
                // 1. Convert image to base64
                const base64StringWithPrefix = await convertImageToBase64(asset.uri);
                const imagePayload: ImageUpload = {
                    image: base64StringWithPrefix,
                    fileType: 0,
                    path: 'public/products/',
                    fileName: asset.fileName,
                };

                // 2. Upload the image
                const uploadResponse = await mediaService.uploadImage(imagePayload);

                if (uploadResponse.data?.status === 1) {
                    const {file, path} = uploadResponse.data.data;
                    const newImage: ProductImage = {
                        image: file,
                        containerName: path,
                        defaultImage: images.length === 0 ? 1 : 0, // Make the first image the default
                    };

                    // 3. Update state and notify parent component
                    const updatedImages = [...images, newImage];
                    setImages(updatedImages);
                    onImagesChange(updatedImages);
                } else {
                    throw new Error('Image upload failed on the server.');
                }
            } catch (err) {
                setError('Failed to upload image. Please try again.');

            } finally {
                setUploading(false);
            }
        });
    };

    const handleDeleteImage = (indexToDelete: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToDelete);
        // If we deleted the default image, make the new first image the default
        if (updatedImages.length > 0 && !updatedImages.some(img => img.defaultImage === 1)) {
            updatedImages[0].defaultImage = 1;
        }
        setImages(updatedImages);
        onImagesChange(updatedImages);
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>Product Images</Text>
            <View style={styles.previewContainer}>
                {images.map((img, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{uri: `http://localhost:8000/uploads/${img.containerName}${img.image}`}}
                               style={styles.thumbnail}/>
                        <Pressable style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
                            <Text style={styles.deleteText}>X</Text>
                        </Pressable>
                    </View>
                ))}
                {uploading && <ActivityIndicator style={styles.loader} color={colors.primary}/>}
            </View>
            <Pressable style={styles.addButton} onPress={handleSelectImage} disabled={uploading}>
                <Text style={styles.addButtonText}>+ Add Image</Text>
            </Pressable>
            {error && <ErrorText message={error}/>}
        </View>
    );
};

// Add styles here
const styles = StyleSheet.create({
    wrapper: {marginBottom: 20},
    label: {fontSize: 16, color: colors.darkGray, marginBottom: 10},
    previewContainer: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'},
    imageContainer: {marginRight: 10, marginBottom: 10},
    thumbnail: {width: 80, height: 80, borderRadius: 8, backgroundColor: colors.lightGray},
    deleteButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {color: 'white', fontWeight: 'bold'},
    loader: {marginLeft: 10},
    addButton: {backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10},
    addButtonText: {color: 'white', fontWeight: 'bold'},
});


export default ImageUploadManager;