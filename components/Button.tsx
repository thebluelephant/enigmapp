
import { colors } from '@/utils/colors';
import { Pressable, Text, StyleSheet, type GestureResponderEvent } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    textStyle?: object;
    type: 'primary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, type }) => {

    return (
        <Pressable style={[styles.button, style, styles[type]]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    primary: {
        backgroundColor: colors.yellow,
    },
    tertiary: {
        backgroundColor: colors.tertiaryBackground
    }
});

export default Button;