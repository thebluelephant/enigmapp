import i18n from '@/app/intl/config';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import { View, Text, StyleSheet } from 'react-native';

interface QuestLevelProps {
    level: number;
}

const QuestLevel = ({ level }: QuestLevelProps) => {
    const totalStars = 3;
    const difficulty = [i18n.t('quest-level.easy'), i18n.t('quest-level.medium'), i18n.t('quest-level.expert')];
    const stars = Array.from({ length: totalStars }, (_, index) =>
        index < level ? '★' : '☆'
    );

    return (
        <View style={styles.container}>
            <Text style={styles.stars}>{stars.join(' ')}</Text>
            <Text style={[titleStyle.subtitle]}>{difficulty[level - 1]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    stars: {
        fontSize: 13,
        color: colors.yellow,
        marginRight: 5,
    }
});

export default QuestLevel;