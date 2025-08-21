import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/colors';


import TopBar from '@/components/TopBar';
import ResultModal from '@/components/ResultModal';
import IntroductionModal from '@/components/quest/IntroductionModal';
import { useGetActiveEnigma } from '@/api/queries/useGetActiveEnigma';
import { useEffect } from 'react';
import ActiveEnigma from '@/components/quest/ActiveEnigma';
import { useGetClues } from '@/api/queries/useGetClues';


const QuestScreen = () => {
    const { id: questSessionId } = useLocalSearchParams();
    const { mutate: getActiveEnigma, data } = useGetActiveEnigma();
    const enigma = data?.enigma;
    const quest = data?.quest;
    const questSession = data?.questSession;
    const isFirstEnigma = !questSession?.solutions
    const { data: clues } = useGetClues(Number(questSessionId), enigma?.id)

    const shouldShowIntroductionModal = questSession && isFirstEnigma && new Date().toDateString() === new Date(questSession?.start_date).toDateString() && questSession.tries_number === 0 && clues?.length === 0

    useEffect(() => {
        getActiveEnigma({ questSessionId: Number(questSessionId) })
    }, []);


    return (
        <SafeAreaView style={styles.quest}>
            <TopBar backButton={true} />
            <ResultModal />
            <IntroductionModal isVisible={!!shouldShowIntroductionModal} text={quest?.description} image={quest?.image} />
            {enigma && quest && questSession && <ActiveEnigma enigma={enigma} questSession={questSession} quest={quest} clues={clues} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    quest: {
        backgroundColor: colors.background,
        flex: 1,
    },
});


export default QuestScreen