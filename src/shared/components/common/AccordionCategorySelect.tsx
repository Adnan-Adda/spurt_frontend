import React, {useState, useEffect, useMemo} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {colors} from '@/shared/styles/colors';
import {Category} from '@/shared/types/category.types';
import {getCategoryListApi} from '@/admin/api/category';
import ErrorText from "@/shared/components/common/ErrorText";

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- TYPES AND HELPERS ---
interface HierarchicalCategory extends Category {
    id: number;
    children: HierarchicalCategory[];
}

interface AccordionCategorySelectProps {
    onValueChange: (value: number | null) => void;
    selectedValue: number | null;
    label: string;
    error?: string;
    touched?: boolean;
}

const buildHierarchy = (categories: Category[]): HierarchicalCategory[] => {
    const categoryMap = new Map<number, HierarchicalCategory>();
    const rootCategories: HierarchicalCategory[] = [];
    categories.forEach(c => categoryMap.set(c.categoryId, {...c, id: c.categoryId, children: []}));
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

// --- RENDER ITEM COMPONENT ---
// @ts-ignore
const CategoryItem = ({item, level, onSelect, onToggle, expandedIds, selectedValue}) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.has(item.id);
    const isSelected = item.id === selectedValue;

    const handleToggle = () => onToggle(item.id);
    const handleSelect = (id: any) => onSelect(id);

    return (
        <View>
            <TouchableOpacity
                style={[styles.modalItem, {paddingLeft: 10 + level * 20}]}
                onPress={hasChildren ? handleToggle : () => handleSelect(item.id)}
            >
                <Text style={[styles.modalItemText, isSelected && styles.selectedItemText]}>
                    {item.name}
                </Text>
                {hasChildren && (
                    <MaterialIcons
                        name={isExpanded ? 'expand-less' : 'expand-more'}
                        size={28}
                        color={colors.darkGray}
                    />
                )}
            </TouchableOpacity>

            {isExpanded && hasChildren && (
                <View>
                    {/* "All in this category" option */}
                    <TouchableOpacity
                        style={[styles.modalItem, styles.allOption, {paddingLeft: 10 + (level + 1) * 20}]}
                        onPress={() => handleSelect(item.id)}
                    >
                        <Text
                            style={[styles.modalItemText, styles.allOptionText, isSelected && styles.selectedItemText]}>
                            All in {item.name}
                        </Text>
                    </TouchableOpacity>

                    {/* Children */}
                    {item.children.map((child: any) => (
                        <CategoryItem
                            key={child.id}
                            item={child}
                            level={level + 1}
                            onSelect={onSelect}
                            onToggle={onToggle}
                            expandedIds={expandedIds}// This needs to be smarter for multi-level
                            selectedValue={selectedValue}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};


// --- MAIN COMPONENT ---
const AccordionCategorySelect: React.FC<AccordionCategorySelectProps> = ({
                                                                             onValueChange,
                                                                             selectedValue,
                                                                             label,
                                                                             error,
                                                                             touched,
                                                                         }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [hierarchy, setHierarchy] = useState<HierarchicalCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

    // Data fetching is now inside the component
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setLoading(true);
                // Fetch all categories - using a large limit to avoid pagination issues
                const response = await getCategoryListApi(10, 2);
                const builtHierarchy = buildHierarchy(response.data.data);
                setHierarchy(builtHierarchy);
            } catch (err: any) {
                setFetchError('Failed to load categories.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryData();
    }, []);

    const toggleExpand = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleSelect = (id: number) => {
        onValueChange(id);
        setModalVisible(false);
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

    const renderItem = ({item}: { item: HierarchicalCategory }) => (
        <CategoryItem
            item={item}
            level={0}
            onSelect={handleSelect}
            onToggle={toggleExpand}
            expandedIds={expandedIds}
            selectedValue={selectedValue}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.pickerButton, touched && error ? styles.errorBorder : {}]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.pickerButtonText} numberOfLines={1}>{selectedItemText}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.darkGray}/>
            </TouchableOpacity>
            {touched && error && <ErrorText message={error}/>}

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Category</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <MaterialIcons name="close" size={28} color={colors.darkGray}/>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color={colors.primary} style={{marginTop: 20}}/>
                    ) : fetchError ? (
                        <ErrorText message={fetchError}/>
                    ) : (
                        <FlatList
                            data={hierarchy}
                            renderItem={renderItem}
                            keyExtractor={item => String(item.id)}
                            extraData={expandedIds} // Ensures re-render on expand/collapse
                        />
                    )}
                </SafeAreaView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {marginBottom: 15},
    label: {fontSize: 16, fontWeight: '600', color: colors.darkGray, marginBottom: 8},
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
    pickerButtonText: {fontSize: 16, color: colors.text, flex: 1},
    errorBorder: {borderColor: colors.danger},
    modalContainer: {flex: 1, backgroundColor: 'white'},
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    modalTitle: {fontSize: 20, fontWeight: 'bold'},
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    modalItemText: {fontSize: 16, color: colors.text},
    selectedItemText: {color: colors.primary, fontWeight: 'bold'},
    allOption: {backgroundColor: '#f8f8f8'},
    allOptionText: {fontStyle: 'italic', color: colors.darkGray},
});

export default AccordionCategorySelect;
