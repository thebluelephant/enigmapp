import { useRequestClue } from '@/api/queries/useRequestClue';
import { Enigma } from '@/types/Quest';
import { QuestSession } from '@/types/QuestSession';
import { colors } from '@/utils/colors';
import React, { useEffect, useState } from 'react';
import Button from '../Button';

interface Props {
    clues: string[] | undefined,
    questSession: QuestSession,
    enigmaId: Enigma['id']
}

const RequestClueButton = ({ clues, questSession, enigmaId }: Props) => {
    const { mutate: requestNewClue } = useRequestClue()
    const [disableRequestClue, setDisableRequestClue] = useState(false);


    useEffect(() => {
        if (clues) {
            setDisableRequestClue(clues.length >= 3)
        }
    }, [clues]);


    const requestClue = async () => {
        if (clues) {
            const requestedCluesCount = clues.length ?? 0
            if (requestedCluesCount < 3) {
                requestNewClue({
                    questSession,
                    enigmaId: enigmaId,
                    nextClueIndex: requestedCluesCount + 1
                })
            }
        }
    }

    return (
        <Button
            title={"Demander un indice"}
            onPress={requestClue}
            type='secondary'
            disabled={disableRequestClue}
            icon={{
                name: 'bulb',
                color: disableRequestClue ? colors.disabledText : 'white',
                size: 15
            }} />
    );
};


export default RequestClueButton;