import type { Enigma, Quest } from "@/types/Quest"
import { supabase } from "./core"
import type { InProgressQuest } from "@/types/InProgressQuest"

export const fetchQuests = async (): Promise<Quest[] | Error | null> => {
    const { data, error } = await supabase
        .from('quests')
        .select()

    if (error) {
        console.log(error.message);
    }
    return data
}

export const fetchQuestById = async (questId: Quest['id']): Promise<Quest | null> => {
    const { data, error } = await supabase
        .from('quests')
        .select()
        .eq('id', questId)

    if (error) {
        console.log(error.message);
    }
    return data?.[0]
}

export const fetchEnigmaById = async (enigmaId: Enigma['id']): Promise<Enigma | null> => {
    const { data, error } = await supabase
        .from('enigmas')
        .select()
        .eq('id', enigmaId)

    if (error) {
        console.log(error.message);
    }
    return data?.[0]
}

export const fetchInProgressQuestByUserId = async (userId: number, questId: Quest['id']): Promise<InProgressQuest | Error | null> => {
    const { data, error } = await supabase
        .from('in_progress_quests')
        .select()
        .eq('user_id', userId)
        .eq('quest_id', questId)

    if (error) {
        console.log(error.message);
    }
    return data?.[0]
}
export const fetchInProgressQuestById = async (ipqId: InProgressQuest['id']): Promise<InProgressQuest | Error | null> => {
    const { data, error } = await supabase
        .from('in_progress_quests')
        .select()
        .eq('id', ipqId)

    if (error) {
        console.log(error.message);
    }
    return data?.[0]
}

/**
 * Return existing in progress quest or create a new one
 * @param userId 
 * @param questId 
 * @returns 
 */
export const postNewInProgressQuest = async (userId: number, questId: Quest['id']): Promise<InProgressQuest | Error | null> => {
    const existingInProgressQuest = await fetchInProgressQuestByUserId(userId, questId)

    if (existingInProgressQuest) {
        return existingInProgressQuest

    } else {
        const { data } = await supabase
            .from('in_progress_quests')
            .insert({ user_id: userId, quest_id: questId })
            .select()
        return data?.[0]
    }
}

