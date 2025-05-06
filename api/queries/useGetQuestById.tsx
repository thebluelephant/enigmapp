import type { Quest } from "@/types/Quest";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestById } from "../Quests";


export const useGetQuestById = (questId: Quest['id']) => {
    return useQuery({
        queryKey: ['quest'],
        queryFn: async () => {
            const response: Error | Quest | null = await fetchQuestById(questId)
            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
