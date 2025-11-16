import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Button';
import RequestClueButton from './RequestClueButton';
import { QuestSession } from '@/types/QuestSession';
import { Enigma } from '@/types/Quest';
import i18n from '@/app/intl/config';
import { TranslationString } from '@/types/Generic';

type EnigmaButtonsProps = {
    clues: TranslationString[] | undefined,
    questSession: QuestSession
    enigmaId: Enigma['id']
    onShowCamera: () => void
};

const EnigmaButtons: React.FC<EnigmaButtonsProps> = ({ clues, questSession, enigmaId, onShowCamera }) => {
    const [disable, setDisable] = useState({ camera: false, clue: false })

    useEffect(() => {
        const hasRequested3Clues = clues && clues.length >= 3
        const hasAnswers3Times = questSession.tries_number === 3

        if (hasAnswers3Times) {
            setDisable({ camera: true, clue: true })
        }
        if (hasRequested3Clues) {
            setDisable({ camera: false, clue: true })
        } else {
            if (questSession.points_to_win === 1) {
                setDisable({ camera: false, clue: true })
            } else if (questSession.points_to_win === 2) {
                setDisable({ camera: false, clue: true })
            } else {
                setDisable({ camera: false, clue: false })
            }
        }
    }, [clues, questSession]);

    return (
        <View style={styles.buttons}>
            <Button
                disabled={disable.camera}
                title={i18n.t('enigma-button.title')}
                onPress={onShowCamera}
                type='primary'
                icon={{
                    name: 'camera',
                    color: 'black',
                    size: 15
                }} />
            <RequestClueButton clues={clues} questSession={questSession} enigmaId={enigmaId} disabled={disable.clue} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        height: 100,
        gap: 5,
        marginTop: 20
    },
});

export default EnigmaButtons;