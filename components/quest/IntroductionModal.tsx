import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import GenericModal from '../GenericModal';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import Icon from '../Icon';
import { QuestSession } from '@/types/QuestSession';
import Button from '../Button';

type IntroductionModalProps = {
    isVisible: boolean,
    text: string,
    image: string
};

const IntroductionModal: React.FC<IntroductionModalProps> = ({
    isVisible,
    text,
    image
}) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setShowModal(isVisible)
    }, [isVisible]);

    return (
        <GenericModal visible={showModal}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <Pressable onPress={() => setShowModal(false)} style={styles.closeIcon}>
                        <Icon name='close' size={20} color='white' />
                    </Pressable>
                    <Image style={styles.image} source={{ uri: image }} />
                    <Text style={titleStyle.subtitle}>{text}</Text>
                    <Button title='OK !' onPress={() => setShowModal(false)} type='primary' style={{ width: '100%' }} />
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
    }
});

export default IntroductionModal;