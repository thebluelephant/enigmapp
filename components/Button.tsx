
import { colors } from '@/utils/colors';
import { Pressable, Text, StyleSheet, type GestureResponderEvent, View } from 'react-native';
import Icon, { IconName } from './Icon';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    textStyle?: object;
    type: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean
    icon?: { name: IconName, color: string, size?: number }
    size?: 'default' | 'mini'
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, type, disabled = false, icon, size = 'default' }) =>
    <Pressable style={[styles.button, style, disabled ? styles.disabled : styles[type], styles[size]]} onPress={onPress} disabled={disabled}>
        {icon && <Icon name={icon.name} color={icon.color} size={icon.size} />}
        <Text style={[styles.text, textStyle, disabled ? styles.textDisabled : styles[type]]}>{title}</Text>
    </Pressable>


const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        flex: 1,
    },
    default: {
        minHeight: 50
    },
    mini: {
        minHeight: 30
    },
    text: {
        fontWeight: 'bold',
    },
    primary: {
        backgroundColor: colors.yellow,
        color: 'black'
    },
    secondary: {
        backgroundColor: colors.secondaryBackground,
        color: 'white'
    },
    tertiary: {
        backgroundColor: colors.tertiaryBackground,
        color: colors.yellow
    },
    disabled: {
        backgroundColor: colors.disabledBackground,
    },
    textDisabled: {
        color: colors.disabledText
    },
});

export default Button;