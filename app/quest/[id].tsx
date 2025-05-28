import { useGetQuestById } from '@/api/queries/useGetQuestById';
import { useGetInProgressSolutionsByQuestId } from '@/api/queries/useGetInProgressSolutionsByQuestId';
import type { Enigma } from '@/types/Quest';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import CurrentEnigma from '@/components/quest/CurrentEnigma';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/colors';

const QuestScreen = () => {
    const { id } = useLocalSearchParams();
    const { userId } = useEnigmappContext()
    const { data: solutions } = useGetInProgressSolutionsByQuestId(Number(id), userId);
    const { data: quest } = useGetQuestById(Number(id));
    const [currentEnigma, setCurrentEnigma] = useState<Enigma | undefined>(undefined)

    useEffect(() => {
        if (quest) {
            const nextStep = (solutions?.length ?? 0) + 1;
            const currentEnigma = quest?.enigmas.find((enigma) => enigma.id === nextStep);
            setCurrentEnigma(currentEnigma);
        }
    }, [solutions, quest]);

    return (
        <SafeAreaView style={styles.quest}>
            {currentEnigma && <CurrentEnigma enigma={currentEnigma} />}
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