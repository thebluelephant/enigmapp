import { useQuery } from "@tanstack/react-query";
import type { Quest } from "@/types/Quest";
import { fetchQuests } from "../Quests";

export const useGetQuests = () => {
    return useQuery({
        queryKey: ['quests'],
        queryFn: async () => {
            try {
                const response: Error | Quest[] | null = await fetchQuests()
                return response
            } catch (e) {
                console.log('useGetQuests error : ', e);
                return e
            }
        },


    })
}
