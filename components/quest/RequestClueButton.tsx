import { useRequestClue } from '@/api/queries/useRequestClue';
import { Enigma } from '@/types/Quest';
import { QuestSession } from '@/types/QuestSession';
import { colors } from '@/utils/colors';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import i18n from '@/app/intl/config';

interface Props {
    clues: string[] | undefined,
    questSession: QuestSession,
    enigmaId: Enigma['id']
    disabled: boolean
}

const RequestClueButton = ({ clues, questSession, enigmaId, disabled }: Props) => {
    const { mutate: requestNewClue } = useRequestClue()

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
            title={i18n.t('request-clue-button.title')}
            onPress={requestClue}
            type='secondary'
            disabled={disabled}
            icon={{
                name: 'bulb',
                color: disabled ? colors.disabledText : 'white',
                size: 15
            }} />
    );
};


export default RequestClueButton;