import type { Enigma, Quest } from '@/types/Quest';
import titleStyle from '@/utils/titleStyle';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { QuestSession } from '@/types/QuestSession';
import Clues from './Clues';
import { useGetClues } from '@/api/queries/useGetClues';
import { colors } from '@/utils/colors'
import AppCamera from './AppCamera';
import EnigmaHeader from './EnigmaHeader';
import EnigmaButtons from './EnigmaButtons';
import { useOnValidAnswer } from '@/api/queries/useOnValidAnswer';
import { useOnWrongAnswer } from '@/api/queries/useOnWrongAnswer';
interface ActiveEnigmaProps {
    enigma: Enigma;
    questSession: QuestSession;
    quest: Quest;
    clues: string[] | undefined
}
const ActiveEnigma = ({ enigma, questSession, quest, clues }: ActiveEnigmaProps) => {
    const [showCamera, setShowCamera] = useState(false);

    const { mutate: onValidAnswer } = useOnValidAnswer()
    const { mutate: onWrongAnswer } = useOnWrongAnswer()

    const validateAnswer = async (answer: string[]) => {
        if (!answer) {
            onWrongAnswer({ questSession: questSession, enigma: enigma })
        }
        const userRightAnswer = enigma.solution.find((solution) => answer.includes(solution))
        if (userRightAnswer) {
            onValidAnswer({ questSession: questSession, enigma: enigma, userRightAnswer: userRightAnswer })
        } else {
            onWrongAnswer({ questSession: questSession, enigma: enigma })
        }
    }

    if (showCamera) {
        return (<AppCamera onCloseCamera={() => setShowCamera(false)} onProposeAnswer={validateAnswer} />)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <EnigmaHeader totalEnigmas={quest.enigmas.length} questSession={questSession} />
            <View style={styles.activeEnigma}>
                <View style={styles.content}>
                    <View >
                        <Image style={styles.image} source={{ uri: enigma.image }} />
                        <Text style={[titleStyle.default_l, styles.title]}>{enigma.title}</Text>
                        <Text style={[styles.text]}>{enigma?.text}</Text>
                    </View>
                    <Clues clues={clues} />
                </View>
                <EnigmaButtons clues={clues} questSession={questSession} enigmaId={enigma.id} onShowCamera={() => setShowCamera(true)} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    activeEnigma: {
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

export default ActiveEnigma;


