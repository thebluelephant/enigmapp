import { useQuery } from "@tanstack/react-query";
import type { Quest } from "@/types/Quest";
import { fetchQuests } from "../Quests";

export const useGetQuests = () => {
    return useQuery({
        queryKey: ['quests'],
        queryFn: async () => {
            const response: Error | Quest[] | null = await fetchQuests()
            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
