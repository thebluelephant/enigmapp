import type { Enigma, Quest } from "@/types/Quest";
import { useQuery } from "@tanstack/react-query";
import { fetchEnigmaById, fetchQuestById } from "../Quests";


export const useGetEnigmaById = (enigmaId: Enigma['id']) => {
    return useQuery({
        queryKey: ['enigma'],
        queryFn: async () => {

            const response: Error | Enigma | null = await fetchEnigmaById(enigmaId)
            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
