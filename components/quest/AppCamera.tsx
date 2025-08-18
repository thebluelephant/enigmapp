import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useCameraDevice, Camera, useCameraFormat } from 'react-native-vision-camera';
import CameraIcon from '../../assets/icons/Camera'
import RNFS from 'react-native-fs';
import { postImageRecognition } from '@/api/Quests';
import { colors } from '@/utils/colors';


type Props = {
    onCloseCamera: () => void
    onProposeAnswer: (proposition: string[]) => void
}

const AppCamera = ({ onCloseCamera, onProposeAnswer }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)

    if (!device) {
        return
    }

    const recognizeImage = async () => {
        setIsLoading(true)
        const photo = await camera?.current?.takePhoto()
        if (photo) {
            const base64 = await RNFS.readFile(photo.path, 'base64');
            try {
                const imageElements = await postImageRecognition(base64)
                console.log('imageElements, ', imageElements);
                onProposeAnswer(imageElements)
                setIsLoading(false)
                onCloseCamera()

            } catch (error) {
                console.log(error);
                setIsLoading(false)
                onCloseCamera()
            }
        }
    }


    return (
        <View style={styles.container}>
            {isLoading && <View style={styles.loadingOverlay} />}
            <Camera
                ref={camera}
                style={styles.camera}
                device={device}
                photo={true}
                isActive={true}
            />
            <View style={styles.buttonContainer}>
                <Pressable onPress={recognizeImage} style={[styles.button, isLoading && styles.disabledButton]} disabled={isLoading}>
                    {isLoading ? (
                        <View><ActivityIndicator color={colors.yellow} size="small" /></View>
                    ) : (
                        <CameraIcon color='white' height={24} />
                    )}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        flex: 1
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50
    },
    button: {
        height: 70,
        width: 70,
        backgroundColor: colors.yellow,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: colors.disabledBackground
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 10
    }
});

export default AppCamera;