import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import i18n from '@/app/intl/config';


const CameraLoader: React.FC = () => (
    <View style={styles.container}>
        <View style={styles.content}>
            <LottieView
                autoPlay
                style={{
                    width: 400,
                    height: 300,
                }}
                source={require('@/assets/animations/cameraLoader.json')}
            />
            <Text style={[titleStyle.default_l, { color: colors.yellow, textAlign: 'center' }]}>{i18n.t('camera-loader.title')}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    },
    content: {
        paddingTop: "20%",
    }
});

export default CameraLoader;