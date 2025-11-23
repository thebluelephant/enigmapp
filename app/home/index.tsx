import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NotificationModal from '@/components/home/NotificationModal';
import Header from '@/components/home/Header';
import CredentialsContainer from "@/components/home/CredentialsContainer"

const Home = () => {
    const [notification, setNotification] = useState<string | null>(null)

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, }}>
            <Image style={styles.image}
                source={require('@/assets/images/login-bkg.png')} />
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[{ flexGrow: 1 }]}
            >
                <ScrollView contentContainerStyle={[styles.container, { justifyContent: 'flex-end' }]}>
                    <NotificationModal
                        notification={notification}
                        onModalClose={() => {
                            setNotification(null)
                        }}
                    />
                    <View style={{ height: "80%" }}>
                        <Header />
                        <CredentialsContainer onSetNotification={setNotification} />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    image: {
        opacity: 0.3,
        resizeMode: 'cover',
        width: '100%',
        height: '40%',
        position: 'absolute',
        zIndex: 200
    },
    container: {
        flex: 1,
        padding: 10
    },
});

export default Home;