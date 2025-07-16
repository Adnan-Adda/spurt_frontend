/*
 * =================================================================
 * == FILE: src/screens/admin/CreateProductScreen.tsx
 * =================================================================
 */
// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { createProductApi } from '../../api/product';
// import { NewProduct } from '../../types';
// import { colors } from '../../styles/colors';
// import AppButton from '../../components/common/AppButton';
// import ErrorText from '../../components/common/ErrorText';
// import ProductDetailForm from '../../components/admin/ProductDetailForm';
// import { parseApiError } from '../../utils/errorHandler';
//
// const CreateProductScreen = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [form, setForm] = useState<Partial<NewProduct>>({
//         status: 1, // Default to active
//         quantity: 0,
//         price: 0,
//         sortOrder: 0,
//     });
//     const navigation = useNavigation();
//
//     const handleInputChange = (name: keyof NewProduct, value: string | number) => {
//         setForm(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleCreateProduct = async () => {
//         // Basic validation
//         if (!form.productName || !form.sku || !form.categoryId) {
//             setError('Product Name, SKU, and Category ID are required.');
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await createProductApi(form as NewProduct);
//             if (response.data && response.data.status === 1) {
//                 Alert.alert('Success', 'Product created successfully!', [
//                     { text: 'OK', onPress: () => navigation.goBack() },
//                 ]);
//             } else {
//                 throw new Error(response.data.message || 'Failed to create product.');
//             }
//         } catch (err: any) {
//             setError(parseApiError(err));
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView style={styles.container}>
//                 <ProductDetailForm form={form} onInputChange={handleInputChange} />
//                 {error && <ErrorText message={error} />}
//                 <AppButton title="Create Product" onPress={handleCreateProduct} loading={loading} />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },
//     container: {
//         flex: 1,
//         padding: 20,
//     },
// });
//
// export default CreateProductScreen;


import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createProductApi } from '../../api/product';
import { NewProduct } from '../../types';
import { colors } from '../../styles/colors';
import AppButton from '../../components/common/AppButton';
import ErrorText from '../../components/common/ErrorText';
import ProductDetailForm from '../../components/admin/ProductDetailForm';
import { parseApiError } from '../../utils/errorHandler';

const CreateProductScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<NewProduct>>({
        productName: '',
        productDescription: '',
        sku: '',
        upc: '',
        hsn: '',
        image: '',
        categoryId: '',
        price: 0,
        quantity: 0,
        dateAvailable: new Date().toISOString().split('T')[0], // Default to today
        status: 1,
        sortOrder: 0,
    });
    const navigation = useNavigation();

    const handleInputChange = (name: keyof NewProduct, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateProduct = async () => {
        // Enhanced validation to check all required fields
        // const requiredFields: (keyof NewProduct)[] = [
        //     'productName', 'sku', 'upc', 'hsn', 'image', 'categoryId', 'price', 'quantity', 'dateAvailable', 'status', 'sortOrder'
        // ];
        //
        // for (const field of requiredFields) {
        //     if (!form[field] && form[field] !== 0) {
        //         setError(`Field '${field}' is required.`);
        //         return;
        //     }
        // }

        setLoading(true);
        setError(null);
        try {
            const response = await createProductApi(form as NewProduct);
            if (response.data && response.data.status === 1) {
                Alert.alert('Success', 'Product created successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                throw new Error(response.data.message || 'Failed to create product.');
            }
        } catch (err: any) {
            setError(parseApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <ProductDetailForm form={form} onInputChange={handleInputChange} />
                {error && <ErrorText message={error} />}
                <AppButton title="Create Product" onPress={handleCreateProduct} loading={loading} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
});

export default CreateProductScreen;