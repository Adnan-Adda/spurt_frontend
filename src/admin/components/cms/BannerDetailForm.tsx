/*
 * =================================================================
 * == FILE: src/admin/components/cms/BannerDetailForm.tsx
 * =================================================================
 */
import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {NewBanner} from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import {colors} from '@/shared/styles/colors';

interface BannerDetailFormProps {
    form: Partial<NewBanner>;
    onInputChange: (name: keyof NewBanner, value: string | number) => void;
}

interface BannerDetailFormProps {
    form: Partial<NewBanner>;
    onInputChange: (name: keyof NewBanner, value: string | number) => void;
    onImageChange: (field: 'image' | 'containerName', value: string) => void;
}

const BannerDetailForm: React.FC<BannerDetailFormProps> = ({form, onInputChange, onImageChange}) => {
    return (
        <View>
            <AppTextInput
                label="Banner Title"
                value={form.title || ''}
                onChangeText={(val) => onInputChange('title', val)}
                placeholder="e.g., Summer Sale"
            />
            <AppTextInput
                label="Link"
                value={form.link || ''}
                onChangeText={(val) => onInputChange('link', val)}
                placeholder="e.g., /products/special-offers"
            />
            <AppTextInput
                label="Position"
                value={form.position?.toString() || '0'}
                onChangeText={(val) => onInputChange('position', parseInt(val, 10) || 0)}
                placeholder="Enter display order"
                keyboardType="numeric"
            />
            <AppTextInput
                label="Content (HTML)"
                value={form.content || ''}
                onChangeText={(val) => onInputChange('content', val)}
                placeholder="Enter banner text or HTML content"
                multiline
                numberOfLines={4}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Active Status</Text>
                <Switch
                    trackColor={{false: '#767577', true: colors.primary}}
                    thumbColor={form.status === 1 ? '#f4f3f4' : '#f4f3f4'}
                    onValueChange={(isActive) => onInputChange('status', isActive ? 1 : 0)}
                    value={form.status === 1}
                />
            </View>
            <Text style={styles.imageLabel}>Banner Image</Text>
            <AppTextInput
                label="Image (Base64)"
                value={form.bannerImage?.[0]?.image || ''}
                onChangeText={(val) => onImageChange('image', val)}
                placeholder="Paste base64 encoded image string"
                multiline
            />
            <AppTextInput
                label="Container Name (Image Path)"
                value={form.bannerImage?.[0]?.containerName || ''}
                onChangeText={(val) => onImageChange('containerName', val)}
                placeholder="e.g., banners/summer"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: colors.text,
    },
    imageLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 15,
        marginBottom: 5,
    }
});

export default BannerDetailForm;