import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCameraDevice, Camera, useCameraFormat } from 'react-native-vision-camera';
import ImageLabeling from '@react-native-ml-kit/image-labeling';
import Button from '../Button';

type Props = {
    onCloseCamera: () => void
}

const AppCamera = ({ onCloseCamera }: Props) => {
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    const format = useCameraFormat(device, [
        { photoResolution: { width: 480, height: 650 } }
    ])

    if (!device) {
        return
    }

    const recognizeImage = async () => {
        const photo = await camera?.current?.takePhoto()
        if (photo) {
            onCloseCamera()
            const rawLabels = await ImageLabeling.label(`file://${photo?.path}`);
            const labels = rawLabels.map((rawLabel) => rawLabel.text)
            console.log(labels);
        }
    }
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <Camera
                ref={camera}
                style={{ position: 'absolute', top: 0, bottom: 50, left: 0, right: 0 }}
                device={device}
                photo={true}
                isActive={true}
                format={format}
            />
            <Button title={'Photo'} onPress={recognizeImage} type={'primary'} style={{ position: 'absolute', bottom: 0, height: 100, width: '100%' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        opacity: 0.7
    },
    clue: {
        backgroundColor: '#1C1E25',
        borderColor: "#2A2F3B",
        borderWidth: 1,
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 5
    }
});

export default AppCamera;