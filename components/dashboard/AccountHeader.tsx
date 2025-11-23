import { useGetAccountById } from '@/api/queries/useGetAccountById';
import { useGetAccountStats } from '@/api/queries/useGetAccountStats';
import i18n from '@/app/intl/config';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

const AccountHeader = () => {
    const { data: stats } = useGetAccountStats()
    const { data: account } = useGetAccountById()

    if (!stats) {
        return
    }

    return (
        <ImageBackground
            source={require('../../assets/images/inspector-office.jpg')}
            imageStyle={{ opacity: 0.2, height: 'auto', width: '100%' }}
            resizeMode='cover'>
            <View style={styles.container}>
                <Text style={[titleStyle.default_l, styles.title]}>{i18n.t('account-header.title', { username: account?.username })}</Text>
                <Text style={titleStyle.subtitle}>{i18n.t('account-header.subtitle')}</Text>

                <View style={styles.subCards}>
                    <View style={styles.subCard}>
                        <Text style={titleStyle.subtitle}>{i18n.t('account-header.resolved-cases')}</Text>
                        <Text style={styles.progress}>{stats.accountResolvedQuests}/{stats.totalAppQuests}</Text>
                    </View>
                    {
                        !!stats.lastQuestProgression &&
                        <View style={styles.subCard}>
                            <Text style={titleStyle.subtitle}>{i18n.t('account-header.in-progress-quest')}</Text>
                            <Text style={styles.progress}>{stats.lastQuestProgression}% {i18n.t('account-header.completed')}</Text>
                        </View>
                    }
                    {
                        <View style={styles.subCard}>
                            <Text style={titleStyle.subtitle}>{i18n.t('account-header.total-score')}</Text>
                            <Text style={styles.progress}>{stats.totalScore ?? 0} {i18n.t('account-header.points')}</Text>
                        </View>
                    }

                </View>
            </View>
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        borderRadius: 8,
        borderColor: colors.yellow,
        borderWidth: 0.3,
        padding: 15
    },
    title: {
        marginBottom: 4,
    },
    ranking: {
        fontFamily: "Roboto_700Bold",
        color: colors.primaryText,
        fontSize: 12,
    },
    subCards: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        marginTop: 15
    },
    subCard: {
        backgroundColor: 'black',
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progress: {
        color: colors.yellow,
        fontFamily: "Roboto_700Bold",
        fontSize: 12,
    }
});

export default AccountHeader;