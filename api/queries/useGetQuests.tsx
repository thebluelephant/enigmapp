import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type { Quest } from "@/types/Quest";
import { fetchQuests } from "../Quests";

export const useGetQuests = (): UseQueryResult<Quest[] | null> => {
    return useQuery<Quest[] | null, Error>({
        queryKey: ['quests'],
        queryFn: async () => {
            try {
                const response = await fetchQuests()
                return response ?? []
            } catch (e) {
                console.log('useGetQuests error : ', e);
                return null
            }
        },
    })
}
