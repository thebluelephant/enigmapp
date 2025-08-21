import { useQuery } from "@tanstack/react-query";
import type { Enigma } from "@/types/Quest";
import { fetchRequestedClues } from "../Clues";
import { RequestedClues } from "@/types/Clue";
import { QuestSession } from "@/types/QuestSession";
import { UseQueryResult } from "@tanstack/react-query";

export const useGetClues = (
    questSessionId: QuestSession['id'],
    enigmaId: Enigma['id'] | undefined
): UseQueryResult<RequestedClues['clues'], Error> => {
    return useQuery<RequestedClues['clues'], Error>({
        queryKey: ['clues', questSessionId, enigmaId],
        queryFn: async () => {
            if (!enigmaId) {
                return []
            }
            try {
                const response: RequestedClues | null = await fetchRequestedClues(questSessionId, enigmaId);
                return response?.clues ?? [];
            } catch (e) {
                console.log('useGetClues error : ', e);
                return [];
            }
        },
    });
}
