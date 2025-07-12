import type { Enigma } from "@/types/Quest"
import { supabase } from "./core"
import { QuestSession } from "@/types/QuestSession"
import { Clue } from "@/types/Clue"


export const fetchClueByEnigmaId = async (enigmaId: Enigma['id'], index: Clue['index']): Promise<Clue | Error | null> => {
    const { data, error } = await supabase
        .from('clues')
        .select('clue')
        .eq('enigma_id', enigmaId)
        .eq('index', index)

    if (error) {
        console.log(error);
    }

    return data?.[0].clue as Clue
}

export const fetchAndUpdateClueByEnigmaId = async (questSession: QuestSession, enigmaId: Enigma['id'], index: Clue['index']) => {
    const clue = await fetchClueByEnigmaId(enigmaId, index)

    //If we get the clue, we update the questSessionClues by incrementing the clues_aked 
    if (clue) {
        const updatedQuestSessionCluesAsked = await updateQuestSessionCluesAsked(questSession, enigmaId, clue)
        if (updatedQuestSessionCluesAsked) {
            return clue
        } else {
            console.log('an error appears in the updatedQuestSessionClues');
        }

    }
}


export const updateQuestSessionCluesAsked = async (questSession: QuestSession, enigmaId: Enigma['id'], newClue: Clue['clue']) => {
    // If the questSession already has clues_aked, we need to get them, extract and update the concern quest, push it back to the clues_aked list and update questSession clues_asked with this new list
    if (questSession.clues_asked) {
        let filteredClues = []
        let clueToUpdate = { clues_asked: 0, enigma_id: 0, clues: [''] }

        // We extract the clue we need to update, and we keep the other clues in an array
        questSession.clues_asked.forEach((clue) => {
            if (clue.enigma_id === enigmaId) {
                clueToUpdate = clue
            } else if (clue.enigma_id !== enigmaId) {
                filteredClues.push(clue)
            }
        })

        // We update the clue, and push it back to the initial clues array (where it was extract before)
        const clueUpdated = { clues_asked: clueToUpdate.clues_asked + 1, enigma_id: clueToUpdate.enigma_id, clues: { ...clueToUpdate.clues, newClue } }
        filteredClues.push(clueUpdated)

        //We push the new array in the DB
        const updatedClues = await updateQuestSessionClueAsked(questSession.id, filteredClues)
        if (updatedClues) {
            return updatedClues
        } else {
            console.log('error');
        }


    } else {
        // If not we create one
        const initClue = [{ enigma_id: enigmaId, clues_asked: 1, clues: [newClue] }]
        const updatedClues = await updateQuestSessionClueAsked(questSession.id, initClue)
        return updatedClues
    }
}

export const updateQuestSessionClueAsked = async (questSessionId: QuestSession['id'], clues: QuestSession['clues_asked']) => {
    const { data } = await supabase
        .from('quest_sessions')
        .update({ clues_aked: clues })
        .eq('id', questSessionId)
        .select()

    return data?.[0].clues
}

export const updateQuestSessionClues = async (questSessionId: QuestSession['id'], clues: QuestSession['clues_asked']) => {
    const { data } = await supabase
        .from('quest_sessions')
        .update({ clues: clues })
        .eq('id', questSessionId)
        .select()

    return data?.[0].clues
}
