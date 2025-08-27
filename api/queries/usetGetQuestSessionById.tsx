import { useQuery } from "@tanstack/react-query";
import { QuestSession } from "@/types/QuestSession";
import { fetchQuestSessionById } from "../Quests";

export const usetGetQuestSessionById = (id: QuestSession['id']) => {
    return useQuery({
        queryKey: ['questSession', id],
        queryFn: async () => {
            try {
                const response = await fetchQuestSessionById(id)
                return response ?? null
            } catch (e) {
                console.log('usetGetQuestSessionById error : ', e);
                throw e
            }
        },
    })
}
