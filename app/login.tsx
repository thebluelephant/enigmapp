import Button from '@/components/Button';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import i18n from './intl/config';
import { supabase } from '@/api/core';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import Icon from '@/components/Icon';
import { fetchAccountById, insertAccount } from '@/api/Account';
import NotificationModal from '@/components/login/NotificationModal';
import { isEmail } from '@/utils/validators';

const Login = () => {
    const router = useRouter()
    const { setUserId } = useEnigmappContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState<string | null>(null)
    const [isDisabled, setIsDisabled] = useState(false)

    const signInWithEmail = async () => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            setNotification(error.message)
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
            setNotification(error.message)
        }
        if (!session) {
            setNotification(i18n.t('login.validate-email'))
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
        <View style={{ height: '100%' }}>
            <Image style={styles.image}
                source={require('@/assets/images/login-bkg.png')} />
            <View style={styles.content}>
                <NotificationModal notification={notification} onModalClose={() => setNotification(null)} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Enigmapp</Text>
                        <Text style={[titleStyle.default_l, { marginBottom: 20 }]}>{i18n.t('login.subtitle')}</Text>
                        <Text style={[titleStyle.default_s, { textAlign: 'center', color: colors.disabledText }]}>{i18n.t('login.legend')}</Text>
                    </View>

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
                        <View style={{ height: 130, gap: 15 }}>
                            <Button title={i18n.t('login.login')} disabled={isDisabled || loading} onPress={() => signInWithEmail()} type={'primary'} />
                            <Button title={i18n.t('login.sign-up')} disabled={isDisabled || loading} onPress={() => signUpWithEmail()} type={'secondary'} />
                        </View>
                    </View>

                    <Text style={{ color: colors.disabledText, fontSize: 10 }}>{i18n.t('login.cgu-1')} <Link style={{ color: colors.yellow }} href={'/cgu'}>{i18n.t('login.cgu-2')}</Link> </Text>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        height: '80%',
        padding: 10,
    },
    content: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'flex-end'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    title: {
        fontSize: 50,
        color: 'white'
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
    image: {
        opacity: 0.3,
        resizeMode: 'cover',
        width: '100%',
        height: '40%',
        position: 'absolute',
        zIndex: 200
    }
});

export default Login;