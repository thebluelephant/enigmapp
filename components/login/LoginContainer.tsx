import i18n from '@/app/intl/config';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Button from '../Button';
import { colors } from '@/utils/colors';
import Icon from '../Icon';
import titleStyle from '@/utils/titleStyle';
import { useRouter } from 'expo-router';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { supabase } from '@/api/core';
import { fetchAccountById, insertAccount } from '@/api/Account';
import { isEmail } from '@/utils/validators';

type Props = {
    onSetNotification: (notification: string) => void
};

const LoginContainer: React.FC<Props> = ({ onSetNotification }) => {
    const router = useRouter()
    const { setUserId } = useEnigmappContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const signInWithEmail = async () => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            onSetNotification(error.message)
        }
        if (data.user) {
            setUserId(data.user.id)
            const hasAlreadyAnAccount = await fetchAccountById(data.user.id)
            if (!hasAlreadyAnAccount) {
                // Insert manualy new user in account table
                await insertAccount(data.user.id, email)
                router.replace('/onboarding')
            } else {
                router.replace('/home')
            }
        }
        setLoading(false)
    }

    const signUpWithEmail = async () => {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            onSetNotification(error.message)
        }
        if (!session) {
            onSetNotification(i18n.t('login.validate-email'))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!isEmail(email) || password.length < 6) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [email, password]);

    return (
        <View style={styles.inputContainer}>
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
            <View style={styles.buttonContainer}>
                <Button title={i18n.t('login.login')} disabled={isDisabled || loading} onPress={() => signInWithEmail()} type={'primary'} />
                <Button title={i18n.t('login.sign-up')} disabled={isDisabled || loading} onPress={() => signUpWithEmail()} type={'secondary'} />
            </View>
        </View>
    );
};

export default LoginContainer;

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
    inputContainer: {
        backgroundColor: '#1D212A',
        width: '100%',
        padding: 15,
        gap: 30,
        borderColor: colors.yellow,
        borderWidth: 0.3,
        borderRadius: 10,
        marginBottom: 20
    },
    buttonContainer: {
        height: 130,
        gap: 15
    }
});