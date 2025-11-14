import type { Enigma } from "@/types/Quest"
import { supabase } from "./core"
import { QuestSession } from "@/types/QuestSession"
import { Clue, RequestedClues } from "@/types/Clue"
import { Account } from "@/types/Account"


export const fetchClueByEnigmaId = async (enigmaId: Enigma['id'], index: Clue['index']): Promise<Clue['clue'] | null> => {
    const { data, error } = await supabase
        .from('clues')
        .select('clue')
        .eq('enigma_id', enigmaId)
        .eq('index', index)

    if (error) {
        console.log("fetchClueByEnigmaId error : ", error);
    }
    return data?.[0].clue
}


export const fetchClueAndUpdateRequestedClues = async (questSession: QuestSession, enigmaId: Enigma['id'], nextClueNumber: Clue['index'], userId: Account['user_id']) => {
    const clue = await fetchClueByEnigmaId(enigmaId, nextClueNumber)
    if (clue) {
        return await updateRequestedCluesWithNewClue(questSession.id, enigmaId, clue, userId)
    }
}


export const updateRequestedCluesWithNewClue = async (
    questSessionId: QuestSession['id'],
    enigmaId: Enigma['id'],
    clue: Clue['clue'],
    userId: Account['user_id']) => {
    // We get user's already requested clues
    const requestedClues = await fetchRequestedClues(questSessionId, enigmaId)

    // If he already requests clues, we update them with the new one
    if (requestedClues) {
        const updatedClues: RequestedClues['clues'] = [...requestedClues.clues, clue]
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
        // Else, we create a request clue entry with the new one
        const { data, error } = await supabase
            .from('requested_clues')
            .insert({ 'enigma_id': enigmaId, 'quest_session_id': questSessionId, 'clues': [clue], 'user_id': userId })
            .select()

        if (error) {
            console.log("updateRequestedCluesWithNewClue insert error : ", error);
        }
        return data?.[0]
    }
}

export const fetchRequestedClues = async (questSessionId: QuestSession['id'], enigmaId: Enigma['id']): Promise<RequestedClues | null> => {
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
