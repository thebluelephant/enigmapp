import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QuestSession } from "@/types/QuestSession";
import { fetchQuestSessionByUserId } from "../Quests";

export const useGetUserQuestSessions = (userId: string): UseQueryResult<QuestSession[] | null> => {
    return useQuery({
        queryKey: ['questSessions', userId],
        queryFn: async () => {
            try {
                const response = await fetchQuestSessionByUserId(userId)
                return response ?? []
            } catch (e) {
                console.log('useGetUserQuestSessions error : ', e);
                throw e
            }
        },
    })
}
