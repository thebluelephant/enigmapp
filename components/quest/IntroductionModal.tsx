import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import GenericModal from '../GenericModal';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import Icon from '../Icon';
import Button from '../Button';

type IntroductionModalProps = {
    isVisible: boolean,
    text: string | undefined,
    image: string | undefined
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
                    <View style={styles.content}>
                        <Text style={titleStyle.subtitle}>{text}</Text>
                        <View >
                            <Button title='OK !' onPress={() => setShowModal(false)} type='primary' />
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