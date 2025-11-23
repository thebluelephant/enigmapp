import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import GenericModal from '@/components/GenericModal';
import Timer from '@/components/Timer';

type NotificationModalProps = {
    notification: string | null,
    onModalClose: () => void
};

const NotificationModal: React.FC<NotificationModalProps> = ({
    notification,
    onModalClose
}) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (notification) {
            setShowModal(true)
        }
    }, [notification]);

    return (
        <GenericModal visible={showModal}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <Text style={[titleStyle.subtitle, { fontSize: 15 }]}>{notification}</Text>
                    <Timer additionalStyle={styles.timer} seconds={5} onTimerFinished={() => {
                        setShowModal(false)
                        onModalClose()
                    }} />
                </View>
            </View>
        </GenericModal >
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '100%',
        padding: 30,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(178, 178, 178, 0.38)',
    },
    container: {
        height: 150,
        width: '100%',
        backgroundColor: colors.tertiaryBackground,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: colors.yellow,
        padding: 20,
        alignItems: 'center'
    },
    timer: {
        position: 'absolute',
        bottom: 30
    }
});

export default NotificationModal;