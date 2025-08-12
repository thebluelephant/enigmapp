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
        <SafeAreaView style={{ height: '100%' }}>
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
        backgroundColor: colors.background,
        gap: 10,
        padding: 10,
        height: '100%'
    }
});

export default HomeScreen;