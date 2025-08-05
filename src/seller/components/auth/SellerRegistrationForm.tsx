import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {NewSeller} from '@/shared/types';
import AppTextInput from '@/shared/components/common/AppTextInput';
import AppButton from '@/shared/components/common/AppButton';
import {colors} from '@/shared/styles/colors';
import RadioButtonGroup from "@/shared/components/common/RadioButtonGroup";
// TODO: Create an API service to fetch countries
// import { getCountries } from '@/shared/api/country';

interface SellerRegistrationFormProps {
    onSubmit: (values: NewSeller) => Promise<void>;
    isSubmitting: boolean;
}

// Validation Schema using Yup
const SellerSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    mobileNumber: Yup.string().required('Mobile number is required'), // String to allow for different formats
    gender: Yup.string().required('Please select a gender'),
    dob: Yup.string().required('Date of birth is required').matches(/^\d{4}-\d{2}-\d{2}$/, 'Please use YYYY-MM-DD format'),
    city: Yup.string().required('City is required'),
    countryId: Yup.number().min(1, 'Please select a country').required('Country is required'),
});

const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
];


const SellerRegistrationForm: React.FC<SellerRegistrationFormProps> = ({onSubmit, isSubmitting}) => {
    // TODO: Fetch countries from an API
    const [countries, setCountries] = useState([{id: 1, name: 'Sweden'}, {id: 2, name: 'USA'}]); // Placeholder

    const formik = useFormik<NewSeller>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobileNumber: 0,
            gender: '',
            dob: '',
            city: '',
            countryId: 0,
        },
        validationSchema: SellerSchema,
        onSubmit: async (values) => {
            await onSubmit(values);
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <AppTextInput
                    label="First Name *"
                    value={formik.values.firstName}
                    onChangeText={formik.handleChange('firstName')}
                    onBlur={formik.handleBlur('firstName')}
                    error={formik.touched.firstName && formik.errors.firstName}
                    touched={formik.touched.firstName}
                />
                <AppTextInput
                    label="Last Name *"
                    value={formik.values.lastName}
                    onChangeText={formik.handleChange('lastName')}
                    onBlur={formik.handleBlur('lastName')}
                    error={formik.touched.lastName && formik.errors.lastName}
                    touched={formik.touched.lastName}
                />
                <AppTextInput
                    label="Email Address *"
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    error={formik.touched.email && formik.errors.email}
                    touched={formik.touched.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <AppTextInput
                    label="Password *"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    error={formik.touched.password && formik.errors.password}
                    touched={formik.touched.password}
                    secureTextEntry
                />
                <AppTextInput
                    label="Mobile Number *"
                    value={String(formik.values.mobileNumber)}
                    onChangeText={formik.handleChange('mobileNumber')}
                    onBlur={formik.handleBlur('mobileNumber')}
                    error={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    touched={formik.touched.mobileNumber}
                    keyboardType="phone-pad"
                />
                <AppTextInput
                    label="Date of Birth (YYYY-MM-DD) *"
                    value={formik.values.dob}
                    onChangeText={formik.handleChange('dob')}
                    onBlur={formik.handleBlur('dob')}
                    error={formik.touched.dob && formik.errors.dob}
                    touched={formik.touched.dob}
                    placeholder="e.g., 1990-05-21"
                />
                <AppTextInput
                    label="City *"
                    value={formik.values.city}
                    onChangeText={formik.handleChange('city')}
                    onBlur={formik.handleBlur('city')}
                    error={formik.touched.city && formik.errors.city}
                    touched={formik.touched.city}
                />
                <RadioButtonGroup
                    label="Gender *"
                    options={genderOptions}
                    selectedValue={formik.values.gender}
                    onValueChange={(value) => formik.setFieldValue('gender', value)}
                    error={formik.touched.gender && formik.errors.gender}
                    touched={formik.touched.gender}
                />
                {/*/!* TODO: Replace with a more user-friendly gender picker *!/*/}
                {/*<Text style={styles.pickerLabel}>Gender *</Text>*/}
                {/*<View*/}
                {/*    style={[styles.pickerContainer, formik.touched.gender && formik.errors.gender ? styles.errorBorder : {}]}>*/}
                {/*    <Picker*/}
                {/*        selectedValue={formik.values.gender}*/}
                {/*        onValueChange={(itemValue) => formik.setFieldValue('gender', itemValue)}*/}
                {/*    >*/}
                {/*        <Picker.Item label="-- Select Gender --" value=""/>*/}
                {/*        <Picker.Item label="Male" value="Male"/>*/}
                {/*        <Picker.Item label="Female" value="Female"/>*/}
                {/*        <Picker.Item label="Other" value="Other"/>*/}
                {/*    </Picker>*/}
                {/*</View>*/}
                {/*{formik.touched.gender && formik.errors.gender &&*/}
                {/*    <Text style={styles.errorText}>{formik.errors.gender}</Text>}*/}


                {/* TODO: Fetch countries dynamically */}
                <Text style={styles.pickerLabel}>Country *</Text>
                <View
                    style={[styles.pickerContainer, formik.touched.countryId && formik.errors.countryId ? styles.errorBorder : {}]}>
                    <Picker
                        selectedValue={formik.values.countryId}
                        onValueChange={(itemValue) => formik.setFieldValue('countryId', itemValue)}
                    >
                        <Picker.Item label="-- Select Country --" value={0}/>
                        {countries.map(country => (
                            <Picker.Item key={country.id} label={country.name} value={country.id}/>
                        ))}
                    </Picker>
                </View>
                {formik.touched.countryId && formik.errors.countryId &&
                    <Text style={styles.errorText}>{formik.errors.countryId}</Text>}


                <AppButton
                    title="Create Account"
                    onPress={() => formik.handleSubmit()}
                    loading={isSubmitting}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    form: {
        padding: 20,
    },
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
    errorBorder: {
        borderColor: colors.danger,
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        marginBottom: 10,
    },
});

export default SellerRegistrationForm;
