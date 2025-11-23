import i18n from '@/app/intl/config';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import { isEmail } from '@/utils/validators';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

type Props = {
    onSubmit: (email: string, password: string) => void,
    type: 'login' | 'signup',
    loading: boolean
};

const UserFormContainer: React.FC<Props> = ({ onSubmit, type, loading }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (!isEmail(email) || password.length < 6) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [email, password]);

    return (
        <View style={{ gap: 20 }} >
            <View style={{ gap: 15 }}>
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

                <View style={{ gap: 10 }}>
                    <View style={styles.label}>
                        <Icon name='lock' color={colors.yellow} />
                        <Text style={titleStyle.subtitle}>{i18n.t('login.password')}</Text>
                    </View>
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="••••••••"
                        placeholderTextColor={colors.disabledBackground}
                        autoCapitalize={'none'}
                        style={styles.input}
                    />
                </View>

            </View>
            <Button
                title={type === 'login' ? i18n.t('login.login') : i18n.t('login.sign-up')}
                disabled={isDisabled || loading}
                onPress={() => onSubmit(email, password)}
                type={'primary'} />

        </View>
    );
};

export default UserFormContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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