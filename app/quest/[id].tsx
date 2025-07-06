import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import CurrentEnigma from '@/components/quest/CurrentEnigma';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/colors';

import useGetCurrentEnigma from '@/hooks/useGetCurrentEnigma';

const QuestScreen = () => {
    const { id: questSessionId } = useLocalSearchParams();
    const { currentEnigma, questSession } = useGetCurrentEnigma(questSessionId as string)

    return (
        <SafeAreaView style={styles.quest}>
            {currentEnigma && questSession && <CurrentEnigma enigma={currentEnigma} questSession={questSession} />}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    quest: {
        backgroundColor: colors.background,
        display: 'flex',
        flex: 1,
        padding: 20,
    },
});


export default QuestScreen