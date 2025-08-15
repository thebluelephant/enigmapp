import { QuestSession } from '@/types/QuestSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateQuestSessionSolutions } from '../Quests'
import { Enigma } from '@/types/Quest'

export const useUpdateQuestSessionSolutions = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            questSession,
            enigmaId,
            userSolution,
        }: {
            questSession: QuestSession
            enigmaId: Enigma['id']
            userSolution: string
        }) => {
            const formattedSolution = {
                quest_id: questSession.quest_id,
                enigma_id: enigmaId,
                solution: userSolution
            }
            return await updateQuestSessionSolutions(questSession, formattedSolution)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['questSession'],
            })

        },
    })
}
