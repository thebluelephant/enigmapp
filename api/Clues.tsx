import type { Enigma } from "@/types/Quest"
import { supabase } from "./core"
import { QuestSession } from "@/types/QuestSession"
import { Clue, RequestedClues } from "@/types/Clue"


export const fetchClueByEnigmaId = async (enigmaId: Enigma['id'], index: Clue['index']): Promise<Clue['clue'] | null>  => {
    const { data, error } = await supabase
        .from('clues')
        .select('clue')
        .eq('enigma_id', enigmaId)
        .eq('index', index)

    if (error) {
        console.log(error);
    }

    return data?.[0].clue as Clue['clue']
}


export const fetchClueAndUpdateRequestedClues = async (questSession: QuestSession, enigmaId: Enigma['id'], nextClueNumber: Clue['index']) => {
    const clue  = await fetchClueByEnigmaId(enigmaId, nextClueNumber)
    if (clue) {
        const requestedCluesUpdated = await updateRequestedCluesWithNewClue(questSession.id, enigmaId, clue)
        if (requestedCluesUpdated) {
            return clue
        } else {
            console.log('an error appears in the updatedQuestSessionClues');
        }
    }
}


export const updateRequestedCluesWithNewClue = async (questSessionId: QuestSession['id'], enigmaId: Enigma['id'], clue: Clue['clue']) => {
    const requestedClues = await fetchRequestedClues(questSessionId, enigmaId)

    if (requestedClues) {
        const updatedClues : RequestedClues['clues'] = [...requestedClues.clues, clue]

        const { data, error } = await supabase
            .from('requested_clues')
            .update({ 'clues': updatedClues })
            .eq('quest_session_id', questSessionId)
            .eq('enigma_id', enigmaId)
            .select()

        if (error) {
            console.log("updateRequestedCluesWithNewClue update error : ", error);
        }

        return data?.[0]
    } else {
        const { data, error } = await supabase
            .from('requested_clues')
            .insert({ 'enigma_id': enigmaId, 'quest_session_id': questSessionId, 'clues': [clue] })
            .select()

        if (error) {
            console.log("updateRequestedCluesWithNewClue insert error : ", error);
        }
        return data?.[0]
    }
}

export const fetchRequestedClues = async (questSessionId: QuestSession['id'], enigmaId: Enigma['id']) : Promise<RequestedClues> => {
    const { data, error } = await supabase
        .from('requested_clues')
        .select()
        .eq('quest_session_id', questSessionId)
        .eq('enigma_id', enigmaId)

    if (error) {
        console.log("FetchrequestedClues error : ", error);
    }
    return data?.[0]
}


export const updateClueAsked = async (questSessionId: QuestSession['id'], clues: QuestSession['clues_asked']) => {
    const { data } = await supabase
        .from('quest_sessions')
        .update({ clues_aked: clues })
        .eq('id', questSessionId)
        .select()

    return data?.[0].clues
}

