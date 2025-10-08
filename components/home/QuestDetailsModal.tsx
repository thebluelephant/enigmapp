import { useEnigmappContext } from '@/utils/EnigmappContext';
import titleStyle from '@/utils/titleStyle';
import { View, Text, StyleSheet, Image, Pressable, Modal, } from 'react-native';
import Button from '../Button';
import QuestLevel from './QuestLevel';
import Icon from '../Icon';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useStartQuest } from '@/api/queries/useStartQuest';
import { getQuestButtonWordingFromState } from '@/utils/quest';

const QuestDetailsModal = () => {
    const { showQuestDetails: quest, setShowQuestDetails, userId } = useEnigmappContext()
    const { mutate: startQuest, data } = useStartQuest();

    if (!quest) {
        return null
    }

    return (
        <GestureRecognizer onSwipeDown={() => setShowQuestDetails(null)}>
            <Modal
                animationType="slide"
                visible={!!quest}
                onRequestClose={() => {
                    setShowQuestDetails(null);
                }}
                backdropColor="#rgba(27, 27, 29, 0.4)"
            >
                <View
                    style={styles.modal}>
                    <Pressable onPress={() => setShowQuestDetails(null)} style={styles.closeIcon}>
                        <Icon name='close' size={20} color='white' />
                    </Pressable>
                    <View>
                        <Text style={titleStyle.default_l}>{quest?.name}</Text>
                        <QuestLevel level={quest?.level ?? 1} />
                    </View>

                    <Image style={styles.image} source={{ uri: quest?.image }} />

                    <View style={styles.subCard}>
                        <Text style={titleStyle.default_s}>Description</Text>
                        <Text style={[titleStyle.subtitle]}>{quest?.description}</Text>
                    </View>
                    <View>
                        <Button
                            disabled={quest.state === 'finished'}
                            title={getQuestButtonWordingFromState(quest.state ?? 'finished')}
                            onPress={() => {
                                startQuest({ userId: userId, questId: quest.id, questState: quest?.state ?? 'notStarted' })
                                setShowQuestDetails(null)
                            }}
                            type={'primary'} />
                    </View>
                </View >
            </Modal >
        </GestureRecognizer >
    );
};

const styles = StyleSheet.create({
    modal: {
        flexDirection: 'column',
        backgroundColor: '#131B2A',
        gap: 10,
        padding: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    subCard: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#131B2A',
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 10
    }
});

export default QuestDetailsModal;