import i18n from '@/app/intl/config';
import Diamond from '@/assets/icons/Diamond';
import { QuestSession } from '@/types/QuestSession';
import { colors } from '@/utils/colors';
import { Shake } from '@/utils/shake';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface EnigmaHeaderProps {
    totalEnigmas: number,
    questSession: QuestSession
}
const EnigmaHeader = ({ totalEnigmas, questSession }: EnigmaHeaderProps) => {
    const activeEnigmaIndex = (questSession.solutions?.length ?? 0) + 1

    return (
        < View style={styles.container} >
            <Text style={[titleStyle.default, styles.step]}>{i18n.t('enigma-header.title')} {activeEnigmaIndex}/{totalEnigmas}</Text>
            <View style={styles.points}>
                <View style={styles.score}>
                    <Diamond height={15} color={colors.yellow} />
                    <Text style={[styles.scoreNumber, styles.totalScore]}>{questSession.score}</Text>
                    <Shake key={questSession.points_to_win}>
                        <Text style={[styles.scoreNumber, styles.pointsToWin]}>+{questSession.points_to_win}</Text>
                    </Shake>
                </View>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    points: {
        flexDirection: 'row'
    },
    step: {
        backgroundColor: 'rgba(187, 144, 44, 0.28)',
        borderRadius: 20,
        display: 'flex',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 10
    },
    score: {
        backgroundColor: 'rgba(187, 144, 44, 0.1)',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
        gap: 5,
        alignItems: 'center'
    },
    scoreNumber: {
        color: colors.yellow
    },
    totalScore: {
        fontFamily: "Roboto_700Bold"
    },
    pointsToWin: {
        borderWidth: 0.5,
        borderColor: colors.yellow,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        fontSize: 9
    }

});

export default EnigmaHeader;