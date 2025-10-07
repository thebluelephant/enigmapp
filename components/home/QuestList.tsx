import { useGetQuests } from '@/api/queries/useGetQuests';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/utils/colors';
import QuestCard from './QuestCard';

import { useGetUserQuestSessions } from '@/api/queries/useGetUserQuestSessionIds';
import { getQuestState } from '@/utils/quest';
import { Quest } from '@/types/Quest';
import { useEnigmappContext } from '@/utils/EnigmappContext';

const QuestList = () => {
    const { userId } = useEnigmappContext()
    const { data: quests } = useGetQuests();
    const { data: questSession } = useGetUserQuestSessions(userId);

    if (!quests) {
        return null
    }

    return (
        <View style={styles.container}>
            {quests.map((quest: Quest) => {
                const associatedQuestSession = questSession?.find((questSession) => questSession.quest_id === quest.id)
                return (
                    <QuestCard quest={quest} key={quest.id} state={getQuestState(quest, associatedQuestSession)} />
                )
            })}
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
        paddingVertical: 10,

    },

});
export default QuestList;