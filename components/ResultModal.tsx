
import Check from '@/assets/icons/Check';
import { colors } from '@/utils/colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Timer from './Timer';
import { useQueryClient } from '@tanstack/react-query';
import Close from '@/assets/icons/Close';
import titleStyle from '@/utils/titleStyle';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Button from './Button';
import i18n from '@/app/intl/config';

export type ResultModalStatus = "success" | "error" | "error_last_chance" | null

type ResultModalProps = {
    status: ResultModalStatus,
    text?: string
    onClose: () => void
}
const ResultModal = ({ status, text, onClose }: ResultModalProps) => {
    const isSuccess = status === 'success'
    const hasFailedOnLastChance = status === 'error_last_chance'
    const queryClient = useQueryClient()

    if (!status) {
        return null
    }

    const closeModal = () => {
        if (isSuccess) {
            queryClient.invalidateQueries({
                queryKey: ['questSession'],
            })
        }
        onClose()
    }


    const getTitle = () => {
        if (isSuccess) {
            return i18n.t('result-modal.title-success')
        }
        if (hasFailedOnLastChance) {
            return i18n.t('result-modal.title-last-chance')
        }
        return i18n.t('result-modal.title-failed')
    }

    const getSubtitle = () => {
        if (isSuccess) {
            return text
        }
        if (hasFailedOnLastChance) {
            return i18n.t('result-modal.subtitle-last-chance')
        }
        return i18n.t('result-modal.subtitle-failed')
    }
    return (
        <Animated.View
            style={styles.container}
            entering={FadeIn.duration(800)}
            exiting={FadeOut.duration(800)}
        >

            <View style={styles.overlay} />
            <View style={styles.modal}>
                <View style={styles.content}>
                    <View style={[styles.icon, isSuccess ? styles.isSuccessIcon : styles.isErrorIcon]}>
                        {isSuccess ? <Check height={30} color={colors.green} /> : <Close height={30} color={colors.red} />}
                    </View>
                    <Text style={[styles.text, styles.title]} >{getTitle()}</Text>
                    <Text style={[styles.text, titleStyle.subtitle]}>{getSubtitle()}</Text>
                </View>

                {isSuccess ?
                    <View style={{ height: 50 }}>
                        <Button title={i18n.t('result-modal.button')} onPress={closeModal} type='primary' />
                    </View>
                    :

                    <Timer additionalStyle={styles.timer} seconds={5} onTimerFinished={closeModal} />}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        height: "50%",
        width: '90%',
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: colors.yellow,
        backgroundColor: 'rgba(49, 60, 49, 0.3)',
        paddingHorizontal: 50,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)'
    },
    title: {
        color: colors.yellow,
        fontFamily: "Roboto_700Bold",
        fontSize: 20,
    },
    text: {
        textAlign: 'center'
    },
    icon: {
        height: 60,
        width: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    isSuccessIcon: {
        backgroundColor: 'rgba(82, 160, 82, 0.12)',
    },
    isErrorIcon: {
        backgroundColor: 'rgba(157, 46, 46, 0.28)',
    },
    timer: {
        position: 'absolute',
        bottom: 20
    }
});


export default ResultModal;