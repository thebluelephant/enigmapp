import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
    default: {
        fontWeight: 'bold',
        color: colors.primaryText,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#9BA2AE',
    },
});

// Style composé (hérite de "default")
const titleStyle = {
    ...styles,
    default_l: [styles.default, { fontSize: 18 }],
    default_m: [styles.default, { fontSize: 16 }],
    default_s: [styles.default, { fontSize: 14 }],
};

export default titleStyle;
