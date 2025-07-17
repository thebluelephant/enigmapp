import type { Enigma } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { QuestSession } from '@/types/QuestSession';
import { useQueryClient } from '@tanstack/react-query';
import { fetchClueAndUpdateRequestedClues } from '@/api/Clues';


interface CurrentEnigmaProps {
    enigma: Enigma;
    questSession: QuestSession;
}
const CurrentEnigma = ({ enigma, questSession }: CurrentEnigmaProps) => {
    const [showCamera, setShowCamera] = useState(false);
    const queryClient = useQueryClient()


    const askClue = async () => {
        const requestedCluesCount = 1 //toupdate
        if (requestedCluesCount && requestedCluesCount < 3) {
            const nextClueNumber = requestedCluesCount + 1
            const newClue = await fetchClueAndUpdateRequestedClues(questSession, enigma.id, nextClueNumber)
            console.log('new clue', newClue);
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

