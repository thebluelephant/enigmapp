import type { Quest } from "@/types/Quest"
import { supabase } from "./core"
import type { InProgressQuest } from "@/types/InProgressQuest"

export const fetchQuests = async (): Promise<Quest[] | Error | null> => {
    const { data, error } = await supabase
        .from('quests')
        .select()

    if (error) {
        throw new Error(error.message)
    }
    return data
}

export const fetchQuestById = async (questId: Quest['id']): Promise<Quest | Error | null> => {
    const { data, error } = await supabase
        .from('quests')
        .select()
        .eq('id', questId)

    if (error) {
        throw new Error(error.message)
    }
    return data[0]
}

export const fetchQuestEnigmas = async (): Promise<{ steps: Quest['enigmas'] }[]> => {
    const { data, error } = await supabase
        .from('quests')
        .select('steps')

    if (error) {
        throw new Error(error.message)
    }
    return data
}

export const fetchCurrentQuestUserSolutions = async (questId: number, userId: number): Promise<InProgressQuest['solutions']> => {
    // Fetch existing in-progress enigma solutions of a userId
    const { data, error } = await supabase
        .from('in_progress_quest')
        .select('solutions')
        .eq('quest_id', questId)
        .eq('user_id', userId)

    if (error) {
        throw new Error(error.message)
    }

    // If no existing data, create it
    if (!data?.length) {
        const { error } = await supabase
            .from('in_progress_quest')
            .insert({ quest_id: questId, user_id: userId, })
            .select('solutions')

        if (error) {
            throw new Error(error.message)
        }
        return []

    }
    return data as InProgressQuest['solutions'] ?? []
}