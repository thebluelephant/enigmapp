import { useEnigmappContext } from '@/utils/EnigmappContext';
import titleStyle from '@/utils/titleStyle';
import { View, Text, StyleSheet, Image, Pressable, Modal, } from 'react-native';
import Button from '../Button';
import QuestLevel from './QuestLevel';
import Icon from '../Icon';
import { startQuest } from '@/utils/quest';
import GestureRecognizer from 'react-native-swipe-gestures';


const QuestDetailsModal = () => {
    const { showQuestDetails: quest, setShowQuestDetails, userId } = useEnigmappContext()
    const isInProgress = quest?.state === 'inProgress'

    if (!quest) {
        return null
    }
    return (
        <GestureRecognizer onSwipeDown={() => setShowQuestDetails(null)}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={!!quest}
                onRequestClose={() => {
                    setShowQuestDetails(null);
                }}

                presentationStyle='overFullScreen'
            >
                <View style={styles.modal}>
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
                            title={isInProgress ? 'Continuer' : 'Commencer'}
                            onPress={() => startQuest(userId, quest.id)}
                            type={'primary'} />
                    </View>
                </View>
            </Modal >
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    modal: {
        flexDirection: 'column',
        gap: 10,
        padding: 20,
        backgroundColor: '#1F2937',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'absolute',
        bottom: 0,

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