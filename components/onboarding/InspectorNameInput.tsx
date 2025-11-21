import i18n from '@/app/intl/config';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

type Props = {
    onUsernameChange: (username: string) => void,
    username: string
}

const InspectorNameInput: React.FC<Props> = ({ onUsernameChange, username }) =>
    <View style={styles.card}>
        <Text style={titleStyle.subtitle}>{i18n.t('onboarding.inspector-name')}</Text>
        <TextInput
            style={styles.input}
            placeholder={i18n.t('onboarding.your-name')}
            placeholderTextColor={colors.disabledBackground}
            onChangeText={onUsernameChange}
            value={username}
        />
    </View>


export default InspectorNameInput;

const styles = StyleSheet.create({
    card: {
        borderColor: colors.yellow,
        borderWidth: 0.3,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#1D212A',
        width: '100%',
        gap: 10
    },
    input: {
        backgroundColor: '#111827',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        color: 'white',
    }
});