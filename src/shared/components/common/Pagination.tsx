import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {colors} from '../../styles/colors';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalItems,
                                                   itemsPerPage,
                                                   onPageChange,
                                               }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return null; // Don't render pagination if there's only one page
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, currentPage === 1 && styles.disabledButton]}
                onPress={handlePrevious}
                disabled={currentPage === 1}
            >
                <MaterialIcons name="chevron-left" size={24}
                               color={currentPage === 1 ? colors.darkGray : colors.primary}/>
                <Text style={[styles.buttonText, currentPage === 1 && styles.disabledText]}>
                </Text>
            </TouchableOpacity>

            <Text style={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </Text>

            <TouchableOpacity
                style={[styles.button, currentPage === totalPages && styles.disabledButton]}
                onPress={handleNext}
                disabled={currentPage === totalPages}
            >
                <Text style={[styles.buttonText, currentPage === totalPages && styles.disabledText]}>
                </Text>
                <MaterialIcons name="chevron-right" size={24}
                               color={currentPage === totalPages ? colors.darkGray : colors.primary}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: colors.border,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    disabledButton: {
        borderColor: colors.border,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    disabledText: {
        color: colors.darkGray,
    },
    pageInfo: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
});

export default Pagination;
