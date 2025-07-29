import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {Role, User} from '@/shared/types';
import {getRolesApi} from '../../../shared/api/role';
import AppTextInput from '../../../shared/components/common/AppTextInput';
import AppButton from '../../../shared/components/common/AppButton';
import {colors} from '@/shared/styles/colors';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';

interface UserDetailFormProps {
    initialValues?: Partial<User>;
    onSubmit: (values: any) => Promise<void>;
    isEditing: boolean;
}


const UserSchema = (isEditing: boolean) => Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    userGroupId: Yup.number().min(1, 'Please select a user role').required('User role is required'),
    password: Yup.string()
        .when([], {
            is: () => !isEditing, // Only require password if creating a new user
            then: (schema) => schema.required('Password is required').min(6, 'Password must be at least 6 characters'),
            otherwise: (schema) => schema.min(6, 'Password must be at least 6 characters or empty'),
        }),
});

const UserDetailForm: React.FC<UserDetailFormProps> = ({initialValues, onSubmit, isEditing}) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [rolesLoading, setRolesLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRolesApi();
                if (response.data && response.data.status === 1) {
                    setRoles(response.data.data);
                }
            } catch (e) {
                // Error handling can be improved, perhaps with an error message prop
                console.error('Failed to load user roles:', e);
            } finally {
                setRolesLoading(false);
            }
        };
        fetchRoles();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: initialValues?.firstName || '',
            lastName: initialValues?.lastName || '',
            email: initialValues?.email || '',
            password: '',
            userGroupId: initialValues?.usergroup?.groupId || 0,
        },
        validationSchema: UserSchema(isEditing),
        onSubmit: async (values) => {
            await onSubmit(values);
        },
        enableReinitialize: true,
    });

    if (rolesLoading) {
        return <LoadingSpinner/>;
    }

    return (
        <View>
            <AppTextInput
                label="First Name *"
                value={formik.values.firstName}
                onChangeText={formik.handleChange('firstName')}
                onBlur={formik.handleBlur('firstName')}
                error={formik.touched.firstName ? formik.errors.firstName : ''}
                touched={formik.touched.firstName}
            />
            <AppTextInput
                label="Last Name *"
                value={formik.values.lastName}
                onChangeText={formik.handleChange('lastName')}
                onBlur={formik.handleBlur('lastName')}
                error={formik.touched.lastName ? formik.errors.lastName : ''}
                touched={formik.touched.lastName}
            />
            <AppTextInput
                label="Email Address *"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                error={formik.touched.email ? formik.errors.email : ''}
                touched={formik.touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <AppTextInput
                label={isEditing ? "New Password (optional)" : "Password *"}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                placeholder={isEditing ? "Leave blank to keep current" : "Enter a strong password"}
                secureTextEntry
                error={formik.touched.password ? formik.errors.password : ''}
                touched={formik.touched.password}
            />
            <Text style={styles.pickerLabel}>User Role *</Text>
            <View
                style={[styles.pickerContainer, formik.touched.userGroupId && formik.errors.userGroupId ? styles.errorBorder : {}]}>
                <Picker
                    selectedValue={formik.values.userGroupId}
                    onValueChange={(itemValue) => formik.setFieldValue('userGroupId', itemValue)}
                    style={styles.picker}
                    enabled={roles.length > 0}
                >
                    <Picker.Item label="-- Select a Role --" value={0}/>
                    {roles.map(role => (
                        <Picker.Item key={role.groupId} label={role.name} value={role.groupId}/>
                    ))}
                </Picker>
            </View>
            {formik.touched.userGroupId && formik.errors.userGroupId && (
                <Text style={styles.errorText}>{formik.errors.userGroupId}</Text>
            )}

            <AppButton
                title={isEditing ? "Save Changes" : "Create User"}
                onPress={() => formik.handleSubmit()}
                loading={formik.isSubmitting}
            />
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
        marginBottom: 4,
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 50,
    },
    errorBorder: {
        borderColor: colors.danger,
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        marginBottom: 10,
    },
});

export default UserDetailForm;
