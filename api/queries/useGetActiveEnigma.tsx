import { QuestSession } from '@/types/QuestSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchEnigmaById, fetchQuestById } from '../Quests'
import { updateAccountWithCompletedQuest, updateAccountWithDeletedInProgressQuest } from '../Account'
import { useAuth0 } from 'react-native-auth0'

export const useGetActiveEnigma = () => {
    const queryClient = useQueryClient()
    const { user } = useAuth0();

    return useMutation({
        mutationFn: async ({
            questSession,
        }: {
            questSession: QuestSession
        }) => {
            if (questSession) {
                const quest = await fetchQuestById(questSession.quest_id)

                if (quest && questSession) {
                    const nextEnigmaIndex = questSession.solutions?.length ?? 0
                    const nextEnigmaId = quest.enigmas[nextEnigmaIndex]
                    // The quest is finished when there's no next enigma id and the number of questsession solutions is equal to the number of this quest enigmas
                    const questIsFinished = !nextEnigmaId && questSession.solutions.length === quest.enigmas?.length

                    if (questIsFinished && user?.sub) {
                        await updateAccountWithCompletedQuest(user?.sub, quest.id)
                        await updateAccountWithDeletedInProgressQuest(user?.sub, quest.id, questSession.id)
                        return { enigma: {}, quest, questSession }
                    }
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
