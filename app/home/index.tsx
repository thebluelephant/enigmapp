import { colors } from '@/utils/colors';
import AccountHeader from '@/components/home/AccountHeader';
import { ScrollView } from "react-native";
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestDetailsModal from '@/components/home/QuestDetailsModal';
import QuestList from '@/components/home/QuestList';
import { useEffect } from 'react';

const HomeScreen = () => {
    //  const { hasPermission, requestPermission } = useCameraPermission()

    /*     useEffect(() => {
            if (!hasPermission) {
                requestPermission().then((status) => { console.log(status); })
            }
    
        }, [requestPermission, hasPermission]); */

    return (
        <SafeAreaView>
            <ScrollView>
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
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
        gap: 10,
        padding: 10
    }
});

export default HomeScreen;