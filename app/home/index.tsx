import { colors } from '@/utils/colors';
import AccountHeader from '@/components/home/AccountHeader';
import { ScrollView } from "react-native";
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestDetailsModal from '@/components/home/QuestDetailsModal';
import QuestList from '@/components/home/QuestList';

const HomeScreen = () => {
    //  const { hasPermission, requestPermission } = useCameraPermission()

    /*     useEffect(() => {
            if (!hasPermission) {
                requestPermission().then((status) => { console.log(status); })
            }
    
        }, [requestPermission, hasPermission]); */

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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