import { useQuery } from "@tanstack/react-query";
import { fetchEnigmas } from "../enigmas";
import type { Enigma } from "@/types/Enigma";

export const useGetEnigmas = () => {
    return useQuery({
        queryKey: ['enigmas',],
        queryFn: async () => {
            const response: Error | Enigma[] | null = await fetchEnigmas()
            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
