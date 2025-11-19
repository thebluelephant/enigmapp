import { colors } from '@/utils/colors';
import AccountHeader from '@/components/home/AccountHeader';
import { RefreshControl, ScrollView } from "react-native";
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestDetailsModal from '@/components/home/QuestDetailsModal';
import QuestList from '@/components/home/QuestList';
import TopBar from '@/components/TopBar';
import { useCameraPermission } from 'react-native-vision-camera';
import { useEffect } from 'react';
import useRefetchData from '@/utils/hooks/useRefetchData';

const HomeScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const { refetch, refreshing } = useRefetchData()

    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
        }
    }, [requestPermission, hasPermission]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopBar backButton={false} account={true} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refetch}
                    />
                }
            >
                <View style={styles.container}>
                    <QuestDetailsModal />
                    <AccountHeader />
                    <QuestList />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        gap: 10,
        padding: 10,
    }
});

export default HomeScreen;