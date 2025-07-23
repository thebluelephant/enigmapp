import { colors } from '@/utils/colors';
import type { Quest, QuestState } from '@/types/Quest';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import titleStyle from '@/utils/titleStyle';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import QuestLevel from './QuestLevel';
import { startQuest } from '@/utils/quest';

interface QuestCardProps {
    quest: Quest
    state: QuestState
}

const QuestCard = ({ quest, state }: QuestCardProps) => {
    const { userId } = useEnigmappContext()
    const { setShowQuestDetails } = useEnigmappContext();
    const isInProgress = state === 'inProgress'
    const hasNotStarted = state === 'notStarted'


    return (
        <View style={[styles.card, styles[state]]}>
            {
                !hasNotStarted &&
                <View style={[styles.banner, isInProgress ? styles.inProgressBanner : styles.completedBanner]}>
                    <Text style={[titleStyle.default_s, styles.textBanner]}>{isInProgress ? 'En cours' : 'Terminé'}</Text>
                </View>
            }
            <Image style={styles.image} source={{ uri: quest.image }} />
            <View style={styles.content}>
                <View>
                    <Text style={titleStyle.default_l}>{quest.name}</Text>
                    <QuestLevel level={quest.level} />
                </View>
                <View style={styles.buttons}>
                    <Button title={"+ d'info"} icon={{ name: 'info', color: 'white', size: 13 }} onPress={() => setShowQuestDetails(quest)} type='secondary' />
                    <Button title={isInProgress ? 'Continuer' : "Commencer"} onPress={() => startQuest(userId, quest.id)} type='primary' />
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: '#1D212A',
        width: '100%',
        maxHeight: 270,
        borderWidth: 0.5,
    },
    banner: {
        height: 25,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        display: 'flex',
        justifyContent: 'center'
    },
    inProgressBanner: {
        backgroundColor: colors.yellow,
    },
    completedBanner: {
        backgroundColor: colors.green
    },
    textBanner: {
        paddingLeft: 10,
        fontSize: 12,
        color: 'black'
    },
    notStarted: {
        borderColor: "#2A2F3B",
        borderWidth: 1
    },
    completed: {
        borderColor: colors.green,
    },
    inProgress: {
        borderColor: colors.yellow,
    },
    image: {
        height: '50%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: 'cover'
    },
    content: {
        flex: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

});

export default QuestCard;