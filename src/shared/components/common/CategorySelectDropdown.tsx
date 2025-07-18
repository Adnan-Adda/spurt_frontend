import React, { useState, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../../styles/colors';
import { Category } from '../../types/category.types';
import AppButton from './AppButton';
import ErrorText from './ErrorText';

// Types and Interfaces
interface HierarchicalCategory extends Category {
    id: number;
    children: HierarchicalCategory[];
}

interface CascadingCategorySelectProps {
    data: Category[];
    loading: boolean;
    fetchError: string | null;
    onValueChange: (value: number | null) => void;
    selectedValue: number | null;
    label: string;
    error?: string;
    touched?: boolean;
}

// Helper function to build the hierarchy
const buildHierarchy = (categories: Category[]): HierarchicalCategory[] => {
    const categoryMap = new Map<number, HierarchicalCategory>();
    const rootCategories: HierarchicalCategory[] = [];
    categories.forEach(c => categoryMap.set(c.categoryId, { ...c, id: c.categoryId, children: [] }));
    categories.forEach(c => {
        const node = categoryMap.get(c.categoryId);
        if (node) {
            if (c.parentInt && categoryMap.has(c.parentInt)) {
                categoryMap.get(c.parentInt)?.children.push(node);
            } else {
                rootCategories.push(node);
            }
        }
    });
    return rootCategories;
};

// The Component
const CascadingCategorySelect: React.FC<CascadingCategorySelectProps> = ({
                                                                             data,
                                                                             loading,
                                                                             fetchError,
                                                                             onValueChange,
                                                                             selectedValue,
                                                                             label,
                                                                             error,
                                                                             touched,
                                                                         }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [hierarchy, setHierarchy] = useState<HierarchicalCategory[]>([]);

    // Navigation state within the modal
    const [history, setHistory] = useState<{ title: string; items: HierarchicalCategory[] }[]>([]);

    // Animation for transitions
    const slideAnim = useMemo(() => new Animated.Value(0), []);

    useEffect(() => {
        if (data.length > 0) {
            const builtHierarchy = buildHierarchy(data);
            setHierarchy(builtHierarchy);
            setHistory([{ title: 'All Categories', items: builtHierarchy }]);
        }
    }, [data]);

    const openModal = () => {
        // Reset to root level when opening
        if (hierarchy.length > 0) {
            setHistory([{ title: 'All Categories', items: hierarchy }]);
        }
        setModalVisible(true);
    };

    const handleItemPress = (item: HierarchicalCategory) => {
        if (item.children && item.children.length > 0) {
            // Navigate forward
            setHistory(prev => [...prev, { title: item.name, items: item.children }]);
        } else {
            // Select item and close
            onValueChange(item.id);
            setModalVisible(false);
        }
    };

    const handleBackPress = () => {
        if (history.length > 1) {
            setHistory(prev => prev.slice(0, -1));
        }
    };

    const findItemPath = (items: HierarchicalCategory[], id: number | null, path: string[] = []): string | null => {
        if (id === null) return null;
        for (const item of items) {
            const currentPath = [...path, item.name];
            if (item.id === id) return currentPath.join(' / ');
            if (item.children) {
                const foundPath = findItemPath(item.children, id, currentPath);
                if (foundPath) return foundPath;
            }
        }
        return null;
    };

    const selectedItemText = useMemo(() => findItemPath(hierarchy, selectedValue) || 'Select a category...', [hierarchy, selectedValue]);

    const currentLevel = history[history.length - 1];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.pickerButton, touched && error ? styles.errorBorder : {}]}
                onPress={openModal}
            >
                <Text style={styles.pickerButtonText} numberOfLines={1}>{selectedItemText}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.darkGray} />
            </TouchableOpacity>
            {touched && error && <ErrorText message={error} />}

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        {history.length > 1 ? (
                            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                                <MaterialIcons name="arrow-back-ios" size={22} color={colors.primary} />
                            </TouchableOpacity>
                        ) : <View style={{width: 40}}/>}
                        <Text style={styles.modalTitle}>{currentLevel?.title || 'Categories'}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <MaterialIcons name="close" size={28} color={colors.darkGray} />
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
                    ) : fetchError ? (
                        <ErrorText message={fetchError} />
                    ) : (
                        <FlatList
                            data={currentLevel?.items || []}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => handleItemPress(item)}>
                                    <Text style={styles.modalItemText}>{item.name}</Text>
                                    {item.children && item.children.length > 0 && (
                                        <MaterialIcons name="chevron-right" size={24} color={colors.darkGray} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </SafeAreaView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 15 },
    label: { fontSize: 16, fontWeight: '600', color: colors.darkGray, marginBottom: 8 },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGray,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 50,
    },
    pickerButtonText: { fontSize: 16, color: colors.text, flex: 1 },
    errorBorder: { borderColor: colors.danger },
    modalContainer: { flex: 1, backgroundColor: 'white' },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    backButton: { padding: 5 },
    closeButton: { padding: 5 },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    modalItemText: { fontSize: 16, color: colors.text },
});

export default CascadingCategorySelect;
