import type { Enigma } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { QuestSession } from '@/types/QuestSession';
import Clues from './Clues';
import { useGetClues } from '@/api/queries/useGetClues';
import { useRequestClue } from '@/api/queries/useRequestClue';
import { colors } from '@/utils/colors';

interface CurrentEnigmaProps {
    enigma: Enigma;
    questSession: QuestSession;
}
const CurrentEnigma = ({ enigma, questSession }: CurrentEnigmaProps) => {
    const [showCamera, setShowCamera] = useState(false);
    const [disableRequestClue, setDisableRequestClue] = useState(false);
    const { data: clues } = useGetClues(questSession.id, enigma.id)
    const { mutate: requestClue } = useRequestClue()

    const askClue = async () => {
        if (clues) {
            const requestedCluesCount = clues.length ?? 0
            if (requestedCluesCount < 3) {
                requestClue({
                    questSession,
                    enigmaId: enigma.id,
                    nextClueIndex: requestedCluesCount + 1
                })
            }
        }
    }

    useEffect(() => {
        if (clues) {
            setDisableRequestClue(clues.length >= 3)
        }
    }, [clues]);

    if (showCamera) {
        /*     return (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                />
            ) */
    }


    return (
        <View style={styles.currentEnigma}>
            <View >
                <View style={styles.content}>
                    <Image style={styles.image} source={{ uri: enigma.image }} />
                    <Text style={titleStyle.default_l}>{enigma.title}</Text>
                    <Text style={[titleStyle.subtitle, styles.text]}>{enigma?.text}</Text>
                </View>
                {!!clues?.length && <Clues clues={clues} />}
            </View>

            <View style={styles.buttons}>
                <Button
                    title={"Faire une proposition"}
                    onPress={() => { }}
                    type='primary'
                    icon={{
                        name: 'camera',
                        color: 'black',
                        size: 15
                    }} />
                <Button
                    title={"Demander un indice"}
                    onPress={() => askClue()}
                    type='secondary' disabled={disableRequestClue}
                    icon={{
                        name: 'bulb',
                        color: disableRequestClue ? colors.disabledText : 'white',
                        size: 15
                    }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    currentEnigma: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.background
    },
    buttons: {
        display: 'flex',
        height: '15%',
        gap: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 20
    },
    content: {
        gap: 10,
        marginBottom: 20
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
    },
});

export default CurrentEnigma;

