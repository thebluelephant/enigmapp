import { colors } from '@/utils/colors';
import type { Quest } from '@/types/Quest';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import titleStyle from '@/utils/titleStyle';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { useRouter } from 'expo-router';
import QuestLevel from './QuestLevel';

interface QuestCardProps {
    quest: Quest
    state: 'completed' | 'inProgress' | 'notStarted'
}

const QuestCard = ({ quest, state }: QuestCardProps) => {
    const { setShowQuestDetails } = useEnigmappContext();
    const router = useRouter();

    return (
        <View style={[styles.card, styles[state]]}>
            <Image style={styles.image} source={{ uri: quest.image }} />
            <View style={styles.content}>
                <View>
                    <Text style={titleStyle.default_l}>{quest.name}</Text>
                    <QuestLevel level={quest.level} />
                </View>
                <View style={styles.buttons}>
                    <Button title={"Plus d'info"} onPress={() => setShowQuestDetails(quest)} type='tertiary' />
                    <Button title={"Démarrer"} onPress={() => router.push(`/quest/${quest.id}`)} type='primary' />
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: colors.secondaryBackground,
        width: '100%',
        height: 170,
    },
    notStarted: {},
    completed: {
        borderColor: colors.green,
        borderWidth: 2,
    },
    inProgress: {
        borderColor: colors.yellow,
        borderWidth: 2,
    },
    image: {
        height: '40%',
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
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

});

export default QuestCard;