/*
 * =================================================================
 * == FILE: src/components/admin/RoleDetailForm.tsx
 * =================================================================
 *
 * A reusable form for creating and editing role details.
 */
import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {NewRole} from '@/shared/types';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import {colors} from '@/shared/styles/colors';

interface RoleDetailFormProps {
    form: Partial<NewRole>;
    onInputChange: (name: keyof NewRole, value: string | number) => void;
}

const RoleDetailForm: React.FC<RoleDetailFormProps> = ({form, onInputChange}) => {
    return (
        <View>
            <AppTextInput
                label="Role Name"
                value={form.name || ''}
                onChangeText={(val) => onInputChange('name', val)}
                placeholder="Enter role name (e.g., 'Manager')"
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Active Status</Text>
                <Switch
                    trackColor={{false: '#767577', true: colors.primary}}
                    thumbColor={form.status === 1 ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(isActive) => onInputChange('status', isActive ? 1 : 0)}
                    value={form.status === 1}
                />
            </View>
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
});

export default RoleDetailForm;
