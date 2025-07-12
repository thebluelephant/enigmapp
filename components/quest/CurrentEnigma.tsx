import type { Enigma } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { QuestSession } from '@/types/QuestSession';
import { fetchAndUpdateClueByEnigmaId } from '@/api/Clues';
import { useQueryClient } from '@tanstack/react-query';


interface CurrentEnigmaProps {
    enigma: Enigma;
    questSession: QuestSession;
}
const CurrentEnigma = ({ enigma, questSession }: CurrentEnigmaProps) => {
    const [showCamera, setShowCamera] = useState(false);
    const queryClient = useQueryClient()


    const askClue = async () => {
        const amountOfCluesAsked = questSession.clues_asked?.find((clue) => clue.enigma_id === enigma.id)?.clues_asked ?? 1;
        if (amountOfCluesAsked && amountOfCluesAsked < 3) {
            const nextClueIndex = amountOfCluesAsked + 1
            const newClue = await fetchAndUpdateClueByEnigmaId(questSession, enigma.id, nextClueIndex)

            queryClient.invalidateQueries({ queryKey: ['questSession'] })
        } else {
            //Disable clue button + no interaction possible with it
        }
    }
    if (showCamera) {
        /*     return (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                />
            ) */
    }

    useEffect(() => {
        console.log('les clues :', questSession.clues);
    }, [questSession]);
    return (
        <View style={styles.currentEnigma}>
            <View style={styles.content}>
                <Image style={styles.image} source={{ uri: enigma.image }} />
                <Text style={titleStyle.default_l}>{enigma.title}</Text>
                <Text style={[titleStyle.subtitle]}>{enigma?.text}</Text>
            </View>

            <View style={styles.buttons}>
                <Button title={"Faire une proposition"} onPress={() => { }} type='primary' />
                <Button title={"Demander un indice"} onPress={() => askClue()} type='tertiary' />
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

