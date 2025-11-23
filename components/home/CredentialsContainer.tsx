import { colors } from "@/utils/colors";
import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import SignUpContainer from "./SignUpContainer";
import LoginContainer from "./LoginContainer";
import BackArrow from "@/assets/icons/BackArrow";
import Button from "../Button";
import i18n from "@/app/intl/config";

type Props = {
    onSetNotification: (notification: string) => void
}
const CredentialsContainer: React.FC<Props> = ({ onSetNotification }) => {
    const [mode, setMode] = useState<'login' | 'signup' | null>(null)

    const onSendNotification = (notification: string) => {
        onSetNotification(notification)
        setMode(null)
    }

    return (
        <View style={styles.formContainer}>
            {
                !!mode ?
                    <Pressable onPress={() => setMode(null)}>
                        <BackArrow color={colors.yellow} height={24} />
                    </Pressable>
                    :
                    <View style={styles.buttonContainer}>
                        <Button title={i18n.t('login.login')} onPress={() => setMode('login')} type={'primary'} />
                        <Button title={i18n.t('login.sign-up')} onPress={() => setMode('signup')} type={'secondary'} />
                    </View>
            }
            {mode === 'login' && <LoginContainer onSetNotification={onSendNotification} />}
            {mode === 'signup' && <SignUpContainer onSetNotification={onSendNotification} />}
        </View>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 120,
        gap: 15
    },
    formContainer: {
        backgroundColor: '#1D212A',
        width: '100%',
        padding: 15,
        gap: 30,
        borderColor: colors.yellow,
        borderWidth: 0.3,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center'

    }
});

export default CredentialsContainer;