import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GenericModal from '../GenericModal';
import { colors } from '@/utils/colors';

import titleStyle from '@/utils/titleStyle';
import { Quest } from '@/types/Quest';
import { QuestSession } from '@/types/QuestSession';
import moment from 'moment'
import Button from '../Button';
import { router } from 'expo-router';

import Diamond from '@/assets/icons/Diamond';
import Clock from '@/assets/icons/Clock';
import LottieView from 'lottie-react-native';
import i18n from '@/app/intl/config';

type ClotureModalProps = {
    isVisible: boolean,
    questName: Quest['name']
    questSession: QuestSession
};

const ClotureModal: React.FC<ClotureModalProps> = ({
    isVisible,
    questName,
    questSession
}) => {
    const [showModal, setShowModal] = useState(false)
    const totalTime = moment(moment(questSession.start_date).locale('fr')).fromNow(true)

    useEffect(() => {
        setShowModal(isVisible)
    }, [isVisible]);

    return (
        <GenericModal visible={showModal}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <LottieView
                            autoPlay
                            speed={0.5}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            loop={false}
                            source={require('@/assets/animations/cloturePrize.json')}
                        />

                        <Text style={[titleStyle.default_xl, styles.title]}>{i18n.t('cloture-modal.congrats')}</Text>
                        <Text style={{ color: colors.primaryText }}>{i18n.t('cloture-modal.quest-finished-1')} "{questName}" {i18n.t('cloture-modal.quest-finished-2')}</Text>

                        <View style={styles.stats}>
                            <View style={styles.stat}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Diamond color={colors.yellow} />
                                    <Text style={styles.statLabel}>{i18n.t('cloture-modal.score')}</Text>
                                </View>
                                <Text style={styles.statNumber}>{questSession.score} {i18n.t('cloture-modal.points')}</Text>
                            </View>
                            <View style={styles.stat}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Clock color={colors.yellow} />
                                    <Text style={styles.statLabel}>{i18n.t('cloture-modal.total-time')}</Text>
                                </View>
                                <Text style={styles.statNumber}>{totalTime}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ height: 30, width: '100%' }}>
                        <Button title={i18n.t('cloture-modal.back-home')} onPress={() => router.replace('/')} type={'primary'} />
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
        backgroundColor: 'rgba(27, 26, 26, 0.94)',
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(241, 200, 38, 0.1)',
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: colors.yellow,
        paddingBottom: 50,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        gap: 20
    },
    content: {
        alignItems: 'center',
        gap: 20,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    stats: {
        width: "100%",
        gap: 10
    },
    stat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statLabel: {
        color: colors.primaryText
    },
    statNumber: {
        color: colors.yellow,
        fontFamily: "Roboto_700Bold",
    },
    title: {
        color: colors.yellow,
        width: '100%',
        textAlign: 'center'
    },
    icon: {
        height: 80,
        width: 80,
        borderRadius: 100,
        backgroundColor: 'rgba(241, 173, 38, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ClotureModal;