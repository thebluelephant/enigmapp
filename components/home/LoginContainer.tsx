import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import UserFormContainer from './UserFormContainer';
import { Link, useRouter } from 'expo-router';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { supabase } from '@/api/core';
import { fetchAccountById, insertAccount } from '@/api/Account';
import i18n from '@/app/intl/config';
import { colors } from '@/utils/colors';
import ForgotPasswordContainer from './ForgotPasswordContainer';

type Props = {
    onSetNotification: (notification: string) => void
};
const LoginContainer: React.FC<Props> = ({ onSetNotification }) => {
    const router = useRouter()
    const { setUserId } = useEnigmappContext()
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState<'login' | 'forgotPassword'>('login')

    const login = async (email: string, password: string) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            onSetNotification(error.message)
        }
        if (data.user) {
            setUserId(data.user.id)
            const existingAccount = await fetchAccountById(data.user.id)
            if (!existingAccount) {
                // Insert manualy new user in account table
                await insertAccount(data.user.id, email)
                router.replace('/onboarding')
            } else {
                if (!existingAccount.onboarded) {
                    router.replace('/onboarding')
                } else {
                    router.replace('/dashboard')
                }
            }
        }
        setLoading(false)
    }

    const resetPassword = async (email: string) => {
        setLoading(true)
        const { data, error } = await supabase.auth.resetPasswordForEmail(email,
            {
                redirectTo: "exp+enigmapp://home",
            })
        if (error) {
            onSetNotification(error.message)
        } else {
            onSetNotification(i18n.t('login.reset-email'))
        }
        setLoading(false)
    }

    return (
        <View style={{ gap: 10 }}>
            {
                mode === 'login' ?
                    <>
                        <UserFormContainer type='login' onSubmit={login} loading={loading} />
                        <Pressable onPress={() => setMode('forgotPassword')} style={{ alignItems: 'center', marginBottom: 30 }}>
                            <Text style={{ color: 'white', textDecorationLine: 'underline' }}>{i18n.t('login.forgot-password')}</Text>
                        </Pressable>
                        <Text style={{ color: colors.disabledText, fontSize: 10, textAlign: 'right' }}>{i18n.t('login.cgu-1')} <Link style={{ color: colors.yellow }} href={'/cgu'}>{i18n.t('login.cgu-2')}</Link> </Text>
                    </>
                    :
                    <ForgotPasswordContainer onSubmit={resetPassword} loading={loading} />
            }
        </View>

    );
};

export default LoginContainer;