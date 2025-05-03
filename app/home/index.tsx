import { colors } from '@/utils/colors';
import AccountHeader from '@/components/home/AccountHeader';
import EnigmaList from '@/components/home/EnigmaList';
import { ScrollView } from "react-native";
import { View, StyleSheet } from 'react-native';
import EnigmaDetailsPopup from '@/components/home/EnigmaDetailsPopup';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <EnigmaDetailsPopup />
                    <AccountHeader />
                    <EnigmaList />
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