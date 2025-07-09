/*
 * =================================================================
 * == FILE: src/components/common/ConfirmationModal.tsx
 * =================================================================
 *
 * A new, reusable confirmation modal to replace the unreliable
 * Alert.alert() on web platforms.
 */
import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import AppButton from './AppButton';

interface ConfirmationModalProps {
    visible: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 visible,
                                                                 title,
                                                                 message,
                                                                 onCancel,
                                                                 onConfirm,
                                                                 confirmButtonText = 'Confirm',
                                                                 cancelButtonText = 'Cancel',
                                                             }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <AppButton title={cancelButtonText} onPress={onCancel} />
                        {/* We can add a style for a destructive button later */}
                        <AppButton title={confirmButtonText} onPress={onConfirm}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        color: colors.textSecondary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default ConfirmationModal;
