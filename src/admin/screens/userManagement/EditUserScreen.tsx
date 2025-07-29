import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert, View, Text} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {userService} from '../../../shared/api/user';
import {UpdateUser, User} from '@/shared/types';
import {colors} from '@/shared/styles/colors';
import {parseApiError} from '@/shared/utils/errorHandler';
import UserDetailForm from '../../components/userManagement/UserDetailForm';
import ErrorText from '../../../shared/components/common/ErrorText';

type ParamList = {
    EditUser: {
        user: User;
    };
};

const EditUserScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const route = useRoute<RouteProp<ParamList, 'EditUser'>>();
    const {user} = route.params;

    const [error, setError] = useState<string | null>(null);
    const handleUpdateUser = async (values: any) => {
        setError(null);
        try {
            const payload: UpdateUser = values;
            await userService.updateUser(user.userId, payload);
            Alert.alert('Success', 'User updated successfully!', [
                {text: 'OK', onPress: () => navigation.goBack()}
            ]);

        } catch (err: any) {
            const errorMessage = parseApiError(err);
            setError(errorMessage);
            Alert.alert('Update Failed', errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Edit User</Text>
                    <UserDetailForm
                        initialValues={user}
                        onSubmit={handleUpdateUser}
                        isEditing={true}
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

export default EditUserScreen;
