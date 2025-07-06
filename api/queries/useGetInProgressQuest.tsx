import { useQuery } from "@tanstack/react-query";
import { fetchInProgressQuestById } from "../Quests";
import { InProgressQuest } from "@/types/InProgressQuest";
import { Quest } from "@/types/Quest";

export const useGetInProgressQuest = (inProgressQuestId: InProgressQuest['id']) => {
    return useQuery({
        queryKey: ['inProgressQuest'],
        queryFn: async () => {
            const response = await fetchInProgressQuestById(inProgressQuestId)

            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
