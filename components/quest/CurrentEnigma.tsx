import type { Enigma } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useObjectDetection } from '@infinitered/react-native-mlkit-object-detection';


interface CurrentEnigmaProps {
    enigma: Enigma;
}
const CurrentEnigma = ({ enigma }: CurrentEnigmaProps) => {
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()
    const [showCamera, setShowCamera] = useState(false);
    const detector = useObjectDetection('default');


    if (showCamera && device) {
        /*     return (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                />
            ) */

    }

    const recognizeImage = async () => {
        if (!detector) {
            return
        }
        detector.detectObjects('@assets/images/bird.jpg').then((result) => console.log(result))

    }


    return (
        <View style={styles.currentEnigma}>
            <View style={styles.content}>
                <Image style={styles.image} source={{ uri: enigma.image }} />
                <Text style={titleStyle.default_l}>{enigma.title}</Text>
                <Text style={[titleStyle.subtitle]}>{enigma?.text}</Text>
            </View>

            <View style={styles.buttons}>
                <Button title={"Faire une proposition"} onPress={() => { recognizeImage() }} type='primary' />
                <Button title={"Demander un indice"} onPress={() => { }} type='tertiary' />
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    currentEnigma: {
        flex: 1,
        gap: 10,
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        height: '15%',
        gap: 10,
    },
    content: {
        gap: 10
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
    },
});

export default CurrentEnigma;

