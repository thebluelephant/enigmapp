import type { Enigma, Quest } from "@/types/Quest"
import { supabase } from "./core"
import { QuestSession, Solution } from "@/types/QuestSession";
import axios from "axios";
import Config from '../env';

export const fetchQuests = async (): Promise<Quest[] | null> => {
    const { data, error } = await supabase
        .from('quests')
        .select()

    if (error) {
        console.log("fetchQuests error : ", error);
    }
    return data
}

export const fetchQuestById = async (questId: Quest['id']): Promise<Quest | null> => {
    const { data, error } = await supabase
        .from('quests')
        .select()
        .eq('id', questId)

    if (error) {
        console.log("fetchQuestsById error : ", error);
    }
    return data?.[0]
}

export const fetchEnigmaById = async (enigmaId: Enigma['id']): Promise<Enigma | null> => {
    const { data, error } = await supabase
        .from('enigmas')
        .select()
        .eq('id', enigmaId)

    if (error) {
        console.log("fetchEnigmaById error : ", error);
    }
    return data?.[0]
}

export const fetchQuestSessionByUserId = async (userId: number): Promise<QuestSession[] | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select()
        .eq('user_id', userId)

    if (error) {
        console.log("fetchQuestSessionByUserId error : ", error);
    }
    return data
}
export const fetchQuestSessionByUserAndQuestId = async (userId: number, questId: Quest['id']): Promise<QuestSession | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select()
        .eq('user_id', userId)
        .eq('quest_id', questId)

    if (error) {
        console.log("fetchQuestSessionByUserAndQuestId error : ", error);
    }
    return data?.[0]
}
export const fetchQuestSessionById = async (ipqId: QuestSession['id']): Promise<QuestSession | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select()
        .eq('id', ipqId)

    if (error) {
        console.log("fetchQuestSessionById error : ", error);
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
    const existingQuestSession = await fetchQuestSessionByUserAndQuestId(userId, questId)

    if (existingQuestSession) {
        return existingQuestSession
    } else {
        const { data, error } = await supabase
            .from('quest_sessions')
            .insert({ user_id: userId, quest_id: questId })
            .select()

        if (error) {
            console.log("postNewQuestSession error : ", error);
        }
        return data?.[0]
    }
}

export const updateQuestSessionSolutions = async (questSession: QuestSession, userSolution: Solution) => {
    const updatedQuestSessionSolutions = [...(questSession.solutions ?? []), userSolution];
    console.log('updated, ', updatedQuestSessionSolutions);
    const { data, error } = await supabase
        .from('quest_sessions')
        .update({ solutions: updatedQuestSessionSolutions })
        .eq('id', questSession.id)
        .select()

    if (error) {
        console.log("fetchQuestSessionById error : ", error);
    }
    return data?.[0]

}

export const postImageRecognition = async (image: Base64URLString) => {
    return axios.post('https://vision.googleapis.com/v1/images:annotate',
        {
            requests: [
                {
                    image: { content: image },
                    features: [{ type: 'OBJECT_LOCALIZATION', maxResults: 10 }],
                }
            ]
        },
        {
            headers: {
                'X-Goog-Api-Key': Config.GOOGLE_API_KEY
            }
        }
    ).then((resp) => resp.data.responses[0].localizedObjectAnnotations?.map((object) => object.name.toLowerCase()))

}

