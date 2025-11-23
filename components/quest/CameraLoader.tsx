import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import i18n from '@/app/intl/config';

const CameraLoader: React.FC = () => (
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
);

const styles = StyleSheet.create({
    content: {
        paddingTop: "20%",
    }
});

export default CameraLoader;