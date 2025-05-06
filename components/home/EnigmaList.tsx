import { useGetQuests } from '@/api/queries/useGetQuests';
import { View, StyleSheet } from 'react-native';
import EnigmaCard from './EnigmaCard';
import { colors } from '@/utils/colors';

const EnigmaList = () => {
    const { data: enigmas } = useGetQuests();

    return (
        <View style={styles.container}>
            {enigmas?.map((enigma) => <EnigmaCard enigma={enigma} key={enigma.id} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        flex: 1,
        gap: 10,
        padding: 10,
    },

});
export default EnigmaList;