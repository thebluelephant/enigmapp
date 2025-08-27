import { QuestSession } from '@/types/QuestSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchEnigmaById, fetchQuestById, fetchQuestSessionById } from '../Quests'

export const useGetActiveEnigma = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            questSession
        }: {
            questSession: QuestSession
        }) => {
            if (questSession) {
                const quest = await fetchQuestById(questSession.quest_id)

                if (quest && questSession) {
                    const nextEnigmaIndex = questSession.solutions?.length ?? 0
                    const nextEnigmaId = quest.enigmas[nextEnigmaIndex]
                    const enigma = await fetchEnigmaById(nextEnigmaId)
                    return { enigma, quest, questSession }
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['questSession'],
            })
        },

    })
}
