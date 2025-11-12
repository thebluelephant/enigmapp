import Button from '@/components/Button';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import i18n from './intl/config';
import * as SecureStore from "expo-secure-store";

const Login = () => {
    const { authorize } = useAuth0();
    const router = useRouter()

    const onRedirectTo = async (type: 'signup' | 'login') => {
        const signUpParams = {
            additionalParameters: {
                screen_hint: "signup",
            }
        }
        try {
            const creds = await authorize(type === 'signup' ? signUpParams : undefined);

            if (creds && creds.accessToken) {
                await SecureStore.setItemAsync("auth_token", creds.idToken);
                router.replace('/home');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Image style={styles.image}
                source={require('@/assets/images/login-bkg.png')} />
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Enigmapp</Text>
                        <Text style={[titleStyle.default_l, { marginBottom: 20 }]}>{i18n.t('login.subtitle')}</Text>
                        <Text style={[titleStyle.default_s, { textAlign: 'center', color: colors.disabledText }]}>{i18n.t('login.legend')}</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Button title={i18n.t('login.login')} onPress={() => onRedirectTo('login')} type={'primary'} />
                        <Button title={i18n.t('login.sign-up')} onPress={() => onRedirectTo('signup')} type={'secondary'} />
                    </View>

                    <Text style={{ color: colors.disabledText }}>{i18n.t('login.cgu-1')} <Link style={{ color: colors.yellow }} href={'/cgu'}>{i18n.t('login.cgu-2')}</Link> </Text>
                </View>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        height: '75%',
        padding: 10,
        gap: 20,
    },
    content: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'flex-end'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    title: {
        fontSize: 50,
        color: 'white'
    },
    buttonsContainer: {
        height: 200,
        backgroundColor: '#1D212A',
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        gap: 15,
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