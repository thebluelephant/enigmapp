import { QuestSession } from '@/types/QuestSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchClueAndUpdateRequestedClues } from '../Clues'
import { updateQuestSessionPointsToWin } from '../Quests'

export const useRequestClue = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            questSession,
            enigmaId,
            nextClueIndex
        }: {
            questSession: QuestSession
            enigmaId: number
            nextClueIndex: number
        }) => {
            return await fetchClueAndUpdateRequestedClues(questSession, enigmaId, nextClueIndex)
        },
        onSuccess: async (data, variables) => {
            const newPointsToWin = variables.questSession.points_to_win - 2
            await updateQuestSessionPointsToWin(variables.questSession, newPointsToWin)
            await queryClient.invalidateQueries({
                queryKey: ['clues', variables.questSession.id, variables.enigmaId],
            })
            await queryClient.invalidateQueries({
                queryKey: ['questSession'],
            })
        },
    })
}
