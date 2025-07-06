import type { Enigma, Quest } from "@/types/Quest"
import { supabase } from "./core"
import { QuestSession } from "@/types/QuestSession"

export const fetchCluesByInProgressEnigma = async (questSessionId: QuestSession['id'], enigmaId: Enigma['id']): Promise<QuestSession['clues'] | Error | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select('clues')
        .eq('id', questSessionId)

    const inProgressEnigmaCluesAsked = data?.[0]?.clues?.find((clue) => clue.enigma_id === enigmaId)
    if (error) {
        throw new Error(error.message)
    }
    return inProgressEnigmaCluesAsked
}