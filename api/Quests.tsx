import type { Enigma, Quest } from "@/types/Quest"
import { openAiClient, supabase } from "./core"
import { QuestSession, Solution } from "@/types/QuestSession";
import { updateAccountWithNewInProgressQuest } from "./Account";

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

export const fetchQuestSessionByUserId = async (userId: string): Promise<QuestSession[] | null> => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .select()
        .eq('user_id', userId)

    if (error) {
        console.log("fetchQuestSessionByUserId error : ", error);
    }
    return data
}
export const fetchQuestSessionByUserAndQuestId = async (userId: string, questId: Quest['id']): Promise<QuestSession | null> => {
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
export const postNewQuestSession = async (userId: string, questId: Quest['id']): Promise<QuestSession | Error | null> => {
    const existingQuestSession = await fetchQuestSessionByUserAndQuestId(userId, questId)

    if (existingQuestSession) {
        return existingQuestSession
    } else {
        const { data: questSession, error } = await supabase
            .from('quest_sessions')
            .insert({ user_id: userId, quest_id: questId })
            .select()

        if (error) {
            console.log("postNewQuestSession error : ", error);
        }

        if (questSession) {
            await updateAccountWithNewInProgressQuest(userId, questId, questSession[0].id)
            return questSession[0]
        }
        return null
    }
}

export const updateQuestSessionSolutions = async (questSession: QuestSession, userSolution: Solution) => {
    const updatedQuestSessionSolutions = [...(questSession.solutions ?? []), userSolution];
    const { data, error } = await supabase
        .from('quest_sessions')
        .update({ solutions: updatedQuestSessionSolutions })
        .eq('id', questSession.id)
        .select()

    if (error) {
        console.log("updateQuestSessionSolutions error : ", error);
    }
    return data?.[0]

}

export const updateQuestSessionPointsToWin = async (questSession: QuestSession, newPointsToWin: number) => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .update({ points_to_win: newPointsToWin })
        .eq('id', questSession.id)
        .select()

    if (error) {
        console.log("updateQuestSessionPointsToWin error : ", error);
    }
    return data?.[0]
}

export const resetQuestSessionPointsToWin = async (questSessionId: QuestSession['id']) => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .update({ points_to_win: 7 })
        .eq('id', questSessionId)
        .select()

    if (error) {
        console.log("resetQuestSessionPointsToWin error : ", error);
    }
    return data?.[0]
}

export const updateQuestSessionScore = async (questSession: QuestSession) => {
    const newScore = questSession.score + questSession.points_to_win
    const { data, error } = await supabase
        .from('quest_sessions')
        .update({ score: newScore })
        .eq('id', questSession.id)
        .select()

    if (error) {
        console.log("updateQuestSessionScore error : ", error);
    }
    return data?.[0]
}

export const updateQuestSessionTriesNumber = async (questSession: QuestSession, triesNumber: number) => {
    const { data, error } = await supabase
        .from('quest_sessions')
        .update({ tries_number: triesNumber })
        .eq('id', questSession.id)
        .select()

    if (error) {
        console.log("updateQuestSessionTriesNumber error : ", error);
    }
    return data?.[0]
}

export const postImageRecognition = async (image: Base64URLString) => {
    const response = await openAiClient.responses.create({
        model: "gpt-4o-mini",
        max_output_tokens: 50,
        input: [
            {
                role: "user",

                content: [
                    { type: "input_text", text: "Detect objects and return a list of strings, no spaces, coma separate" },
                    {
                        type: "input_image",
                        image_url: `data:image/jpeg;base64,${image}`,
                        detail: 'low'
                    },
                ],
            },
        ],
    });
    const responseToArray = response.output_text.split(",")
    return responseToArray
}

