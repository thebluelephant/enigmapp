import React from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import GenericModal from '../GenericModal';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import Icon from '../Icon';
import Button from '../Button';
import { useEnigmappContext } from '@/utils/EnigmappContext';

type IntroductionModalProps = {
    text: string | undefined,
    image: string | undefined
};

const IntroductionModal: React.FC<IntroductionModalProps> = ({
    text,
    image
}) => {
    const { showIntroductionModal, setShowIntroductionModal } = useEnigmappContext()

    return (
        <GenericModal visible={showIntroductionModal}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <Pressable onPress={() => setShowIntroductionModal(false)} style={styles.closeIcon}>
                        <Icon name='close' size={20} color='white' />
                    </Pressable>
                    <Image style={styles.image} source={{ uri: image }} />
                    <View style={styles.content}>
                        <Text style={titleStyle.subtitle}>{text}</Text>
                        <View >
                            <Button title='OK !' onPress={() => setShowIntroductionModal(false)} type='primary' />
                        </View>
                    </View>
                </View>
            </View>
        </GenericModal>
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(178, 178, 178, 0.3)',
    },
    container: {
        height: '80%',
        width: '80%',
        backgroundColor: colors.tertiaryBackground,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: colors.yellow,
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default IntroductionModal;