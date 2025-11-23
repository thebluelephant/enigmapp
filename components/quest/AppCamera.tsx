import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useCameraDevice, Camera } from 'react-native-vision-camera';
import CameraIcon from '../../assets/icons/Camera'
import RNFS from 'react-native-fs';
import { postImageRecognition } from '@/api/Quests';
import { colors } from '@/utils/colors';
import CameraLoader from './CameraLoader';
import * as ImageManipulator from 'expo-image-manipulator';
import BackArrow from '@/assets/icons/BackArrow';


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
        const photo = await camera?.current?.takePhoto()
        if (photo) {
            setIsLoading(true)
            const resized = await ImageManipulator.manipulateAsync(
                photo.path,
                [{ resize: { width: 512 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );
            const base64 = await RNFS.readFile(resized.uri, 'base64');

            try {
                const imageElements = await postImageRecognition(base64)
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
            <View style={styles.fakeTopBar}>
                {
                    !isLoading && <Pressable onPress={() => onCloseCamera()} >
                        <BackArrow color={colors.yellow} height={24} />
                    </Pressable>
                }
            </View>
            {
                isLoading ?
                    <CameraLoader />
                    :
                    <View>
                        <Camera
                            ref={camera}
                            style={styles.camera}
                            device={device}
                            photo={true}
                            isActive={true}
                        />
                        <View style={styles.buttonContainer}>
                            <Pressable onPress={recognizeImage} style={[styles.button, isLoading && styles.disabledButton]} disabled={isLoading}>
                                <CameraIcon color='white' height={24} />
                            </Pressable>
                        </View>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    camera: {
        height: '100%'
    },
    buttonContainer: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100
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
    },
    fakeTopBar: {
        width: '100%',
        height: 50,
        padding: 10,
    }

});

export default AppCamera;