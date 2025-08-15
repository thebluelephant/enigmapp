import type { Enigma } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { QuestSession } from '@/types/QuestSession';
import Clues from './Clues';
import { useGetClues } from '@/api/queries/useGetClues';
import { useRequestClue } from '@/api/queries/useRequestClue';
import { colors } from '@/utils/colors'
import AppCamera from './AppCamera';
import { useUpdateQuestSessionSolutions } from '@/api/queries/useUpdateQuestSessionSolutions';

interface CurrentEnigmaProps {
    enigma: Enigma;
    questSession: QuestSession;
}
const CurrentEnigma = ({ enigma, questSession }: CurrentEnigmaProps) => {
    const [showCamera, setShowCamera] = useState(false);
    const [disableRequestClue, setDisableRequestClue] = useState(false);
    const { data: clues } = useGetClues(questSession.id, enigma.id)
    const { mutate: requestClue } = useRequestClue()
    const { mutate: updateQuestSessionSolutions } = useUpdateQuestSessionSolutions()

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

    const verifyProposition = async (proposition: string[]) => {
        const userRightAnswer = enigma.solution.find((solution) => proposition.includes(solution))

        if (userRightAnswer) {
            console.log('enigma solution : ', enigma.solution, 'userProposition : ', proposition, 'matching ? ', userRightAnswer);
            updateQuestSessionSolutions({ questSession: questSession, enigmaId: enigma.id, userSolution: userRightAnswer })
        }

    }

    useEffect(() => {
        if (clues) {
            setDisableRequestClue(clues.length >= 3)
        }
    }, [clues]);


    if (showCamera) {
        return (<AppCamera onCloseCamera={() => setShowCamera(false)} onProposeSolution={verifyProposition} />)
    }

    return (
        <View style={styles.currentEnigma}>
            <View style={styles.content}>
                <View >
                    <Image style={styles.image} source={{ uri: enigma.image }} />
                    <Text style={titleStyle.default_l}>{enigma.title}</Text>
                    <Text style={[titleStyle.subtitle, styles.text]}>{enigma?.text}</Text>
                </View>
                {!!clues?.length && <Clues clues={clues} />}
            </View>

            <View style={styles.buttons}>
                <Button
                    title={"Faire une proposition"}
                    onPress={() => setShowCamera(true)}
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
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.background
    },
    content: {
        gap: 10,

    },
    buttons: {
        height: 100,
        gap: 5,
    },
    text: {
        fontSize: 14,
        lineHeight: 20
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10
    },
});

export default CurrentEnigma;


