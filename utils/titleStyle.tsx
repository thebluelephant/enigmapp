import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
    default: {
        color: colors.primaryText,
        marginBottom: 4,
        fontFamily: "Roboto_700Bold"
    },
    subtitle: {
        fontSize: 12,
        color: '#9BA2AE',
        fontFamily: "Roboto_700Bold"

    },
});

// Style composé (hérite de "default")
const titleStyle = {
    ...styles,
    default_xl: [styles.default, { fontSize: 30 }],
    default_l: [styles.default, { fontSize: 18 }],
    default_m: [styles.default, { fontSize: 16 }],
    default_s: [styles.default, { fontSize: 14 }],
};

export default titleStyle;
