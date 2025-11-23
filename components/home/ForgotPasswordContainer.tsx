import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { colors } from '@/utils/colors';
import Icon from '../Icon';
import titleStyle from '@/utils/titleStyle';
import Button from '../Button';
import { isEmail } from '@/utils/validators';
import i18n from '@/app/intl/config';

type Props = {
    onSubmit: (email: string) => void
    loading: boolean
};
const ForgotPasswordContainer: React.FC<Props> = ({ onSubmit, loading }) => {
    const [email, setEmail] = useState('')

    return (
        <View style={{ gap: 30 }}>
            <View style={{ gap: 10 }}>
                <View style={styles.label}>
                    <Icon name='email' color={colors.yellow} />
                    <Text style={titleStyle.subtitle}>Email</Text>
                </View>

                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    placeholderTextColor={colors.disabledBackground}
                    autoCapitalize={'none'}
                    style={styles.input}
                />
            </View>
            <View>
                <Button
                    title={i18n.t('login.reset-password')}
                    disabled={loading || !isEmail(email)}
                    onPress={() => onSubmit(email)}
                    type={'primary'} />
            </View>
        </View>

    );
};

export default ForgotPasswordContainer;

const styles = StyleSheet.create({
    label: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5
    },
    input: {
        backgroundColor: '#111827',
        padding: 12,
        fontSize: 16,
        color: 'white',
        borderColor: colors.yellow,
        borderWidth: 0.3,
        borderRadius: 10,
    },

});