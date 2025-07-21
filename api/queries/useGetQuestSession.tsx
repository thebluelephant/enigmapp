import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QuestSession } from "@/types/QuestSession";
import { fetchQuestSessionById } from "../Quests";

export const useGetQuestSession = (questSessionId: QuestSession['id']): UseQueryResult<QuestSession | null> => {
    return useQuery({
        queryKey: ['questSession', questSessionId],
        queryFn: async () => {
            try {
                const response = await fetchQuestSessionById(questSessionId)
                return response
            } catch (e) {
                console.log('useGetQuestSession error : ', e);
                throw e
            }
        },
    })
}
