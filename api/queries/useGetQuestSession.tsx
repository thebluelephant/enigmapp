import { useQuery } from "@tanstack/react-query";
import { QuestSession } from "@/types/QuestSession";
import { fetchQuestSessionById } from "../Quests";

export const useGetQuestSession = (questSessionId: QuestSession['id']) => {
    return useQuery({
        queryKey: ['questSession'],
        queryFn: async () => {
            const response = await fetchQuestSessionById(questSessionId)

            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
