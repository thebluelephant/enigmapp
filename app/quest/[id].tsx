import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/colors';
import TopBar from '@/components/TopBar';
import IntroductionModal from '@/components/quest/IntroductionModal';

import ActiveEnigma from '@/components/quest/ActiveEnigma';
import { useGetClues } from '@/api/queries/useGetClues';

import ClotureModal from '@/components/quest/ClotureModal';
import { getLocale } from '@/utils/locale';
import useStableData from '@/utils/hooks/useStableData';


const QuestScreen = () => {
    const lang = getLocale()
    const { id: questSessionId } = useLocalSearchParams();
    const { questSession, enigma, quest } = useStableData(Number(questSessionId))
    const hasNextEnigma = enigma && Object.keys(enigma).length
    const { data: clues } = useGetClues(Number(questSessionId), enigma?.id)

    if (!hasNextEnigma && quest && questSession) {
        return (<ClotureModal isVisible={true} questName={quest.name[lang]} questSession={questSession} />)
    }

    return (
        <SafeAreaView style={styles.quest}>
            <TopBar backButton={true} />
            {quest && quest.description && <IntroductionModal text={quest?.description[lang]} image={quest?.image} />}
            {hasNextEnigma && quest && questSession && <ActiveEnigma enigma={enigma} questSession={questSession} quest={quest} clues={clues} />}
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