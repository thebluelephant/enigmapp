import type { Enigma, Quest } from "@/types/Quest"
import { supabase } from "./core"
import type { InProgressQuest } from "@/types/InProgressQuest"

export const fetchCluesByInProgressEnigma = async (inProgressQuestId: InProgressQuest['id'], enigmaId: Enigma['id']): Promise<InProgressQuest['clues'] | Error | null> => {
    const { data, error } = await supabase
        .from('in_progress_quests')
        .select('clues')
        .eq('id', inProgressQuestId)

    const inProgressEnigmaCluesAsked = data?.[0]?.clues?.find((clue) => clue.enigma_id === enigmaId)
    if (error) {
        throw new Error(error.message)
    }
    return inProgressEnigmaCluesAsked
}