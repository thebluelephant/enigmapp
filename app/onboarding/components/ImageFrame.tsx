import { colors } from '@/utils/colors';
import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageSourcePropType } from 'react-native';

type Props = {
    isFirstStep: boolean,
    source: ImageSourcePropType
};

const ImageFrame: React.FC<Props> = ({ isFirstStep, source }) => {
    const { height: SCREEN_HEIGHT } = Dimensions.get('window');
    const FRAME_HEIGHT = SCREEN_HEIGHT * 0.6;
    const ORIGINAL_ASPECT_RATIO = 600 / 1200;

    if (!source) {
        return null
    }
    return (
        isFirstStep ? (
            <Image
                source={source}
                style={[styles.containerImage, styles.firstImage]}
                resizeMode="center"
            />
        ) : (
            <View style={[styles.imageFrame, { height: FRAME_HEIGHT }]} >
                <Image
                    source={source}
                    style={[
                        styles.image,
                        { height: '100%', aspectRatio: ORIGINAL_ASPECT_RATIO }
                    ]}
                    resizeMode="contain"
                />
            </View >
        )
    )
};

export default ImageFrame;

const styles = StyleSheet.create({
    imageFrame: {
        width: '80%',
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: colors.yellow,
        borderRadius: 20,
        backgroundColor: '#f5a00c21',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: undefined, // important to keep to make aspectRatio works
    },
    containerImage: {
        borderRadius: 20,
        backgroundColor: '#f5a00c21',
        borderWidth: 0.7,
        borderColor: colors.yellow,
    },
    firstImage: {
        resizeMode: 'center',
        width: '80%',
        height: '50%',
        borderWidth: 20,
        borderColor: '#f5a00c21',
    },
});