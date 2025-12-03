import React, { useState } from 'react';
import UserFormContainer from './UserFormContainer';
import { supabase } from '@/api/core';
import i18n from '@/app/intl/config';

type Props = {
    onSetNotification: (notification: string) => void
};
const SignUpContainer: React.FC<Props> = ({ onSetNotification }) => {
    const [loading, setLoading] = useState(false)

    const signUp = async (email: string, password: string) => {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: "exp+enigmapp://home"
            }

        })
        if (error) {
            onSetNotification(error.message)
        }
        if (!session) {
            onSetNotification(i18n.t('login.validate-email'))
        }
        setLoading(false)
    }

    return <UserFormContainer type='signup' onSubmit={signUp} loading={loading} />;
};

export default SignUpContainer;