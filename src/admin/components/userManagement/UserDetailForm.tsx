/*
 * =================================================================
 * == FILE: src/components/admin/UserDetailForm.tsx
 * =================================================================
 *
 * A reusable form for creating and editing user details.
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {NewUser, Role} from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import {colors} from '@/shared/styles/colors';

interface UserDetailFormProps {
    form: Partial<NewUser>;
    roles: Role[];
    onInputChange: (name: keyof NewUser, value: string | number) => void;
    isEditing?: boolean;
}

const UserDetailForm: React.FC<UserDetailFormProps> = ({form, roles, onInputChange, isEditing = false}) => {
    return (
        <View>
            <AppTextInput
                label="First Name"
                value={form.firstName || ''}
                onChangeText={(val) => onInputChange('firstName', val)}
                placeholder="Enter user's first name"
            />
            <AppTextInput
                label="Last Name"
                value={form.lastName || ''}
                onChangeText={(val) => onInputChange('lastName', val)}
                placeholder="Enter user's last name"
            />
            <AppTextInput
                label="Email Address"
                value={form.email || ''}
                onChangeText={(val) => onInputChange('email', val)}
                placeholder="Enter user's email"
                // keyboardType="email-address"
            />
            <AppTextInput
                label={isEditing ? "New Password (optional)" : "Password"}
                value={form.password || ''}
                onChangeText={(val) => onInputChange('password', val)}
                placeholder={isEditing ? "Leave blank to keep current password" : "Enter a strong password"}
                secureTextEntry
            />
            <Text style={styles.pickerLabel}>User Role</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={form.userGroupId}
                    onValueChange={(itemValue) => onInputChange('userGroupId', itemValue)}
                    style={styles.picker}
                    enabled={roles.length > 0}
                >
                    {roles.length > 0 ? roles.map(role => (
                        <Picker.Item key={role.groupId} label={role.name} value={role.groupId}/>
                    )) : <Picker.Item label="Loading roles..." value={0}/>}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerLabel: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 8,
        fontWeight: '600',
    },
    pickerContainer: {
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 10,
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 50,
    },
});

export default UserDetailForm;
