import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {userService} from '../../api/user';
import {NewUser} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import {parseApiError} from '@/shared/utils/errorHandler';
import UserDetailForm from '../../components/userManagement/UserDetailForm';
import ErrorText from '../../../shared/components/common/ErrorText';


const CreateUserScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [error, setError] = useState<string | undefined>(undefined);

    const handleCreateUser = async (values: any) => {
        setError(undefined);
        try {
            await userService.createUser(values);
            Alert.alert('Success', 'User created successfully!', [
                {text: 'OK', onPress: () => navigation.goBack()}
            ]);

        } catch (err: any) {
            setError(parseApiError(err));
            Alert.alert('Creation Failed');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Create New User</Text>
                    <UserDetailForm
                        initialValues={{}}
                        onSubmit={handleCreateUser}
                        isEditing={false}
                    />
                    {error && <ErrorText message={error}/>}
                </View>
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
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary,
    },
});

export default CreateUserScreen;
