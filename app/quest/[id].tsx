import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import CurrentEnigma from '@/components/quest/CurrentEnigma';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/colors';

import useGetCurrentEnigma from '@/hooks/useGetCurrentEnigma';
import TopBar from '@/components/TopBar';
import ResultModal from '@/components/ResultModal';
import IntroductionModal from '@/components/quest/IntroductionModal';


const QuestScreen = () => {
    const { id: questSessionId } = useLocalSearchParams();
    const { currentEnigma, questSession, quest } = useGetCurrentEnigma(questSessionId as string)
    const isFirstEnigma = !questSession?.solutions

    return (
        <SafeAreaView style={styles.quest}>
            <TopBar backButton={true} />
            <ResultModal />
            {quest && <IntroductionModal isVisible={isFirstEnigma} text={quest?.description} image={quest?.image} />}
            {currentEnigma && questSession && <CurrentEnigma enigma={currentEnigma} questSession={questSession} />}
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