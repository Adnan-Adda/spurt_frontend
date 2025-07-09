// //
// // /*
// //  * =================================================================
// //  * == FILE: src/screens/admin/DashboardScreen.tsx
// //  * =================================================================
// //  *
// //  * A placeholder screen for the admin dashboard. It displays a
// //  * welcome message and a logout button.
// //  */
// // import React, { useContext } from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import AppButton from '../../components/common/AppButton';
// // import { AuthContext } from '../../state/AuthContext';
// // import { colors } from '../../styles/colors';
// //
// // const DashboardScreen = () => {
// //     const { logout, user } = useContext(AuthContext);
// //
// //     return (
// //         <View style={dashboardScreenStyles.container}>
// //             <Text style={dashboardScreenStyles.title}>Dashboard</Text>
// //             <Text style={dashboardScreenStyles.welcomeText}>Welcome, {user?.firstName || 'Admin'}!</Text>
// //             <View style={dashboardScreenStyles.buttonContainer}>
// //                 <AppButton title="Logout" onPress={logout} />
// //             </View>
// //         </View>
// //     );
// // };
// //
// // const dashboardScreenStyles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         padding: 20,
// //         backgroundColor: colors.background,
// //     },
// //     title: {
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         marginBottom: 20,
// //     },
// //     welcomeText: {
// //         fontSize: 18,
// //         marginBottom: 40,
// //         color: colors.textSecondary,
// //     },
// //     buttonContainer: {
// //         width: '100%',
// //     }
// // });
// //
// // export default DashboardScreen;
//
//
//
//
// /*
//  * =================================================================
//  * == FILE: src/screens/admin/DashboardScreen.tsx (MODIFIED FOR DEBUGGING)
//  * =================================================================
//  *
//  * This screen is updated with console logs to help diagnose why
//  * data might not be appearing.
//  */
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
// import { AuthContext } from '../../state/AuthContext';
// import { colors } from '../../styles/colors';
// import AppButton from '../../components/common/AppButton';
// import { getDashboardCountsApi } from '../../api/dashboard';
// import { DashboardCounts } from '../../types';
// import StatCard from '../../components/admin/StatCard';
// import ErrorText from '../../components/common/ErrorText';
//
// const DashboardScreen = () => {
//     const { logout, user } = useContext(AuthContext);
//     const [counts, setCounts] = useState<DashboardCounts | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchDashboardData = async () => {
//         console.log('[DashboardScreen] Starting to fetch dashboard data...'); // DEBUG LOG
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await getDashboardCountsApi();
//
//             // DEBUG LOG: Log the entire response from the API
//             console.log('[DashboardScreen] API Response Received:', JSON.stringify(response.data, null, 2));
//
//             if (response.data && response.data.status === 1) {
//                 console.log('[DashboardScreen] API call successful. Setting counts.'); // DEBUG LOG
//                 setCounts(response.data.data);
//             } else {
//                 // This will handle cases where the API returns a success status code (2xx) but a business logic error (status: 0)
//                 const errorMessage = response.data.message || 'Failed to fetch dashboard data';
//                 console.error('[DashboardScreen] API Error (Business Logic):', errorMessage); // DEBUG LOG
//                 throw new Error(errorMessage);
//             }
//         } catch (err: any) {
//             // This will catch network errors or other exceptions during the API call
//             const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
//             console.error('[DashboardScreen] API Error (Catch Block):', errorMessage); // DEBUG LOG
//             setError(errorMessage);
//         } finally {
//             console.log('[DashboardScreen] Fetch process finished.'); // DEBUG LOG
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         // This effect runs when the component mounts
//         fetchDashboardData();
//     }, []);
//
//     const statTitles: { [key in keyof DashboardCounts]?: string } = {
//         productCount: 'Total Products',
//         categoryCount: 'Total Categories',
//         customerCount: 'Total Customers',
//         salesCount: 'Total Sales'
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView
//                 contentContainerStyle={styles.scrollViewContent}
//                 refreshControl={
//                     <RefreshControl refreshing={loading} onRefresh={fetchDashboardData} colors={[colors.primary]} tintColor={colors.primary}/>
//                 }
//             >
//                 <View style={styles.header}>
//                     <Text style={styles.title}>Dashboard</Text>
//                     <Text style={styles.welcomeText}>Welcome, {user?.firstName || 'Admin'}!</Text>
//                 </View>
//
//                 {error && (
//                     <View style={styles.errorContainer}>
//                         <ErrorText message={`Error: ${error}`} />
//                     </View>
//                 )}
//
//                 <View style={styles.statsGrid}>
//                     {(loading && !counts) ? (
//                         // Show loading skeletons only on initial load
//                         Array.from({ length: 4 }).map((_, index) => (
//                             <StatCard key={index} title="" value="" loading={true} />
//                         ))
//                     ) : counts ? (
//                         Object.keys(statTitles).map(key => (
//                             <StatCard
//                                 key={key}
//                                 title={statTitles[key as keyof DashboardCounts]!}
//                                 value={counts[key as keyof DashboardCounts]}
//                                 loading={loading} // Pass loading state for refresh indicator
//                             />
//                         ))
//                     ) : !error ? (
//                         // Handle case where there are no counts and no error
//                         <Text style={styles.noDataText}>No dashboard data available.</Text>
//                     ) : null}
//                 </View>
//
//                 <View style={styles.footer}>
//                     <AppButton title="Logout" onPress={logout} />
//                 </View>
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
//     scrollViewContent: {
//         flexGrow: 1,
//     },
//     container: {
//         flex: 1,
//     },
//     header: {
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 10,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: colors.text,
//     },
//     welcomeText: {
//         fontSize: 16,
//         color: colors.textSecondary,
//         marginTop: 4,
//     },
//     statsGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         paddingHorizontal: 16,
//         marginTop: 20,
//     },
//     errorContainer: {
//         marginHorizontal: 20,
//         padding: 10,
//         backgroundColor: '#f8d7da',
//         borderColor: '#f5c6cb',
//         borderWidth: 1,
//         borderRadius: 8,
//     },
//     noDataText: {
//         textAlign: 'center',
//         marginTop: 20,
//         color: colors.textSecondary,
//         fontSize: 16,
//     },
//     footer: {
//         padding: 20,
//         marginTop: 'auto', // Pushes logout button to the bottom
//     }
// });
//
// export default DashboardScreen;




/*
 * =================================================================
 * == FILE: src/screens/admin/DashboardScreen.tsx (MODIFIED FOR DEBUGGING)
 * =================================================================
 *
 * This screen is updated to pass the onPress handler directly to
 * the StatCard and includes logging to trace the press event.
 */
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { AuthContext } from '../../state/AuthContext';
// import { colors } from '../../styles/colors';
// import AppButton from '../../components/common/AppButton';
// import { getDashboardCountsApi } from '../../api/dashboard';
// import { DashboardCounts } from '../../types';
// import StatCard from '../../components/admin/StatCard';
// import ErrorText from '../../components/common/ErrorText';
//
// type AdminStackParamList = {
//     Dashboard: undefined;
//     ProductList: undefined;
// };
// type DashboardScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'Dashboard'>;
//
//
// const DashboardScreen = () => {
//     const { logout, user } = useContext(AuthContext);
//     const [counts, setCounts] = useState<DashboardCounts | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const navigation = useNavigation<DashboardScreenNavigationProp>();
//
//     const fetchDashboardData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await getDashboardCountsApi();
//             if (response.data && response.data.status === 1) {
//                 setCounts(response.data.data);
//             } else {
//                 throw new Error(response.data.message || 'Failed to fetch dashboard data');
//             }
//         } catch (err: any) {
//             const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
//             setError(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchDashboardData();
//     }, []);
//
//     const statTitles: { [key in keyof DashboardCounts]?: string } = {
//         productCount: 'Total Products',
//         categoryCount: 'Total Categories',
//         customerCount: 'Total Customers',
//         salesCount: 'Total Sales'
//     };
//
//     const handleCardPress = (key: string) => {
//         // --- DEBUG LOG ---
//         console.log(`[DashboardScreen] Card pressed with key: ${key}`);
//
//         if (key === 'productCount') {
//             console.log('[DashboardScreen] Navigating to ProductList...');
//             navigation.navigate('ProductList');
//         } else {
//             console.log(`[DashboardScreen] No navigation defined for key: ${key}`);
//         }
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView
//                 style={styles.container}
//                 refreshControl={
//                     <RefreshControl refreshing={loading} onRefresh={fetchDashboardData} />
//                 }
//             >
//                 <View style={styles.header}>
//                     <Text style={styles.title}>Dashboard</Text>
//                     <Text style={styles.welcomeText}>Welcome, {user?.firstName || 'Admin'}!</Text>
//                 </View>
//
//                 {error && <ErrorText message={error} />}
//
//                 <View style={styles.statsGrid}>
//                     {counts ? (
//                         Object.keys(statTitles).map(key => (
//                             <View key={key} style={styles.cardContainer}>
//                                 <StatCard
//                                     title={statTitles[key as keyof DashboardCounts]!}
//                                     value={counts[key as keyof DashboardCounts]}
//                                     loading={loading}
//                                     onPress={() => handleCardPress(key)} // <-- PASS ONPRESS DIRECTLY
//                                 />
//                             </View>
//                         ))
//                     ) : (
//                         Array.from({ length: 4 }).map((_, index) => (
//                             <View key={index} style={styles.cardContainer}>
//                                 <StatCard title="" value="" loading={true} />
//                             </View>
//                         ))
//                     )}
//                 </View>
//
//                 <View style={styles.footer}>
//                     <AppButton title="Logout" onPress={logout} />
//                 </View>
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
//     },
//     header: {
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 10,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: colors.text,
//     },
//     welcomeText: {
//         fontSize: 16,
//         color: colors.textSecondary,
//         marginTop: 4,
//     },
//     statsGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         paddingHorizontal: 12,
//         marginTop: 20,
//     },
//     cardContainer: {
//         width: '50%',
//         paddingHorizontal: 4,
//     },
//     footer: {
//         padding: 20,
//         marginTop: 20,
//     }
// });
//
// export default DashboardScreen;








/*
 * =================================================================
 * == FILE: src/screens/admin/DashboardScreen.tsx (MODIFIED)
 * =================================================================
 *
 * Refactored to be a "Control Panel" that navigates to sub-menus.
 */
import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../../state/AuthContext';
import { colors } from '../../styles/colors';
import AppButton from '../../components/common/AppButton';
import DashboardModuleCard from '../../components/admin/DashboardModuleCard';

// Define the types for the navigator to ensure type safety
type AdminStackParamList = {
    Dashboard: undefined;
    UserManagement: undefined;
    // Add other main modules here as we create them
};
type DashboardScreenNavigationProp = StackNavigationProp<AdminStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
    const { logout, user } = useContext(AuthContext);
    const navigation = useNavigation<DashboardScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Control Panel</Text>
                    <Text style={styles.welcomeText}>Welcome, {user?.firstName || 'Admin'}!</Text>
                </View>

                <View style={styles.moduleGrid}>
                    <DashboardModuleCard
                        title="User & Role Management"
                        description="Create vendors, admins, and manage permissions."
                        onPress={() => navigation.navigate('UserManagement')}
                    />
                    {/* We will add more modules here */}
                    <DashboardModuleCard
                        title="Product Management"
                        description="Manage categories, products, and inventory."
                        onPress={() => { /* We will create this screen next */ }}
                    />
                    <DashboardModuleCard
                        title="Site Content"
                        description="Manage banners and informational pages."
                        onPress={() => { /* We will create this screen next */ }}
                    />
                </View>

                <View style={styles.footer}>
                    <AppButton title="Logout" onPress={logout} />
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
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
    },
    welcomeText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 4,
    },
    moduleGrid: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    footer: {
        padding: 20,
        marginTop: 20,
    }
});

export default DashboardScreen;
