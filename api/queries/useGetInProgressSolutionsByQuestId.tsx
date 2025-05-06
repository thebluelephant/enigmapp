import { useQuery } from "@tanstack/react-query";
import { fetchCurrentQuestUserSolutions } from "../Quests";

export const useGetInProgressSolutionsByQuestId = (enigmaId: number, userId: number) => {
    return useQuery({
        queryKey: ['inProgressSolutionsByEnigmaId'],
        queryFn: async () => {
            const response = await fetchCurrentQuestUserSolutions(enigmaId, userId)

            if (response instanceof Error) {
                throw new Error(response.message)
            }
            return response
        },


    })
}
