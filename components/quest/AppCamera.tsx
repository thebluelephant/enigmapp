import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useCameraDevice, Camera, useCameraFormat } from 'react-native-vision-camera';
import CameraIcon from '../../assets/icons/Camera'
import RNFS from 'react-native-fs';
import { postImageRecognition } from '@/api/Quests';
import { colors } from '@/utils/colors';


type Props = {
    onCloseCamera: () => void
    onProposeSolution: (proposition: string[]) => void
}

const AppCamera = ({ onCloseCamera, onProposeSolution }: Props) => {
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    const format = useCameraFormat(device, [
        { photoResolution: { width: 651, height: 970 } }
    ])

    if (!device) {
        return
    }

    const recognizeImage = async () => {
        const photo = await camera?.current?.takePhoto()
        if (photo) {
            const base64 = await RNFS.readFile(photo.path, 'base64');
            try {
                const imageElements = await postImageRecognition(base64)
                onProposeSolution(imageElements)
                onCloseCamera()
            } catch (error) {
                console.log(error);
                onCloseCamera()
            }
        }
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={camera}
                style={styles.camera}
                device={device}
                photo={true}
                isActive={true}
                format={format}
            />
            <View style={styles.buttonContainer}>
                <Pressable onPress={recognizeImage} style={styles.button}>
                    <CameraIcon color='white' height={24} />
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

    }
});

export default AppCamera;