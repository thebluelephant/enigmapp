import { useGetQuestById } from '@/api/queries/useGetQuestById';
import { useGetInProgressSolutionsByQuestId } from '@/api/queries/useGetInProgressSolutionsByQuestId';
import type { Enigma } from '@/types/Quest';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const EnigmeScreen = () => {
    const { id } = useLocalSearchParams();
    const { userId } = useEnigmappContext()
    const { data: solutions } = useGetInProgressSolutionsByQuestId(Number(id), userId);
    const { data: quest } = useGetQuestById(Number(id));
    const [currentEnigma, setCurrentEnigma] = useState<Enigma | null>(null)

    useEffect(() => {
        const isFirstStep = !solutions?.length;
        if (quest) {
            if (isFirstStep) {
                setCurrentEnigma(quest.enigmas[0]);
            } else {
                const nextStep = solutions.length + 1
                setCurrentEnigma(quest.enigmas[nextStep])
            }
        }
    }, [solutions, quest]);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>Énigme ID : {id}</Text>
            {/* Tu peux ici fetcher les données d’énigme en fonction de l’id */}
        </View>
    );
}

export default EnigmeScreen;