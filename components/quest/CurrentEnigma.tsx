import type { Enigma } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Button from '../Button';
import { QuestSession } from '@/types/QuestSession';
import Clues from './Clues';
import { useGetClues } from '@/api/queries/useGetClues';
import { useRequestClue } from '@/api/queries/useRequestClue';
import { colors } from '@/utils/colors'
import AppCamera from './AppCamera';
import { useUpdateQuestSessionSolutions } from '@/api/queries/useUpdateQuestSessionSolutions';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import RequestClueButton from './RequestClueButton';


interface CurrentEnigmaProps {
    enigma: Enigma;
    questSession: QuestSession;
}
const CurrentEnigma = ({ enigma, questSession }: CurrentEnigmaProps) => {
    const [showCamera, setShowCamera] = useState(false);
    const { data: clues } = useGetClues(questSession.id, enigma.id)
    const { mutate: updateQuestSessionSolutions } = useUpdateQuestSessionSolutions()
    const { setResultModalStatus } = useEnigmappContext()

    const validateAnswer = async (answer: string[]) => {
        console.log('propositions:, ', answer);
        if (!answer) {
            setResultModalStatus('error')
        }
        const userRightAnswer = enigma.solution.find((solution) => answer.includes(solution))
        if (userRightAnswer) {
            updateQuestSessionSolutions({ questSession: questSession, enigma: enigma, userSolution: userRightAnswer })
        } else {
            setResultModalStatus('error')
        }
    }

    if (showCamera) {
        return (<AppCamera onCloseCamera={() => setShowCamera(false)} onProposeAnswer={validateAnswer} />)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.currentEnigma}>
                <View style={styles.content}>
                    <View >
                        <Image style={styles.image} source={{ uri: enigma.image }} />
                        <Text style={[titleStyle.default_l, styles.title]}>{enigma.title}</Text>
                        <Text style={[styles.text]}>{enigma?.text}</Text>
                    </View>
                    <Clues clues={clues} />
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
                    <RequestClueButton clues={clues} questSession={questSession} enigmaId={enigma.id} />
                </View>
            </View>
        </ScrollView>
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
        gap: 20,
    },
    title: {
        marginBottom: 10
    },
    buttons: {
        height: 100,
        gap: 5,
        marginTop: 20
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.primaryText
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
        marginBottom: 20
    },
});

export default CurrentEnigma;


