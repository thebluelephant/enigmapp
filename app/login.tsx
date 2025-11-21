import { colors } from '@/utils/colors';
import { Link, } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import i18n from './intl/config';
import NotificationModal from '@/components/login/NotificationModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@/components/login/Header';
import LoginContainer from '@/components/login/LoginContainer';

const Login = () => {
    const [notification, setNotification] = useState<string | null>(null)

    return (
        <View style={{ height: '100%' }}>
            <Image style={styles.image}
                source={require('@/assets/images/login-bkg.png')} />
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraScrollHeight={80}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[styles.content, { flexGrow: 1 }]}
            >
                <View style={styles.content}>
                    <NotificationModal notification={notification} onModalClose={() => setNotification(null)} />
                    <View style={styles.container}>
                        <Header />
                        <LoginContainer onSetNotification={(notification) => setNotification(notification)} />
                        <Text style={{ color: colors.disabledText, fontSize: 10 }}>{i18n.t('login.cgu-1')} <Link style={{ color: colors.yellow }} href={'/cgu'}>{i18n.t('login.cgu-2')}</Link> </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View >

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