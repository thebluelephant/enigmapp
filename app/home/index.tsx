import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NotificationModal from '@/components/home/NotificationModal';
import Header from '@/components/home/Header';
import CredentialsContainer from "@/components/home/CredentialsContainer"
import useKeyboardVisibility from '@/utils/hooks/useKeyboardVisibility';

const Home = () => {
    const [notification, setNotification] = useState<string | null>(null)
    const { keyboardVisible } = useKeyboardVisibility()

    return (
        <View style={styles.home}>
            <Image style={styles.image}
                source={require('@/assets/images/login-bkg.png')} />

            <View style={styles.container}>
                <NotificationModal
                    notification={notification}
                    onModalClose={() => {
                        setNotification(null)
                    }}
                />
                <View style={[styles.content, { height: keyboardVisible ? '100%' : '80%' }]}>
                    <Header />
                    <KeyboardAwareScrollView>
                        <CredentialsContainer onSetNotification={setNotification} />
                    </KeyboardAwareScrollView>
                </View>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: colors.background
    },
    image: {
        opacity: 0.3,
        resizeMode: 'cover',
        width: '100%',
        height: '40%',
        position: 'absolute',
        zIndex: 200
    },
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'flex-end'
    },
    content: {
        justifyContent: 'space-between'
    }
});

export default Home;