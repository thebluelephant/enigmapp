import { useEnigmappContext } from '@/utils/EnigmappContext';
import titleStyle from '@/utils/titleStyle';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import Button from '../Button';
import CloseIcon from '../../assets/icons/close.svg';
import { useRouter } from 'expo-router';
import QuestLevel from './QuestLevel';

const QuestDetailsModal = () => {
    const { showQuestDetails: quest, setShowQuestDetails } = useEnigmappContext()
    const router = useRouter()

    if (!quest) {
        return null
    }
    return (
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
                <Pressable onPress={() => setShowQuestDetails(null)}>
                    <CloseIcon width={20} height={20} fill="red" style={styles.closeIcon} />
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
                        title={'Commencer'}
                        onPress={() => {
                            setShowQuestDetails(null)
                            router.push(`/quest/${quest.id}`)
                        }}
                        type={'primary'} />
                </View>
            </View>
        </Modal >
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
        right: 0
    }
});

export default QuestDetailsModal;