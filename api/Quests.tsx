import type { Enigma, Quest } from "@/types/Quest"
import { supabase } from "./core"
import { QuestSession } from "@/types/QuestSession";

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

export const fetchQuestSessionByUserId = async (userId: number, questId: Quest['id']): Promise<QuestSession | Error | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select()
        .eq('user_id', userId)
        .eq('quest_id', questId)

    if (error) {
        console.log(error.message);
    }
    return data?.[0]
}
export const fetchQuestSessionById = async (ipqId: QuestSession['id']): Promise<QuestSession | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select()
        .eq('id', ipqId)

    if (error) {
        console.log(error.message);
    }
    return data?.[0]
}

/**
 * Return existing quest session or create a new one
 * @param userId 
 * @param questId 
 * @returns 
 */
export const postNewQuestSession = async (userId: number, questId: Quest['id']): Promise<QuestSession | Error | null> => {
    const existingQuestSession = await fetchQuestSessionByUserId(userId, questId)

    if (existingQuestSession) {
        return existingQuestSession

    } else {
        const { data } = await supabase
            .from('quest_sessions')
            .insert({ user_id: userId, quest_id: questId })
            .select()
        return data?.[0]
    }
}

