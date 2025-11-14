import { QuestSession } from '@/types/QuestSession'
import { useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { fetchClueAndUpdateRequestedClues } from '../Clues'
import { updateQuestSessionPointsToWin } from '../Quests'
import { useEnigmappContext } from '@/utils/EnigmappContext'

export const useRequestClue = () => {
    const queryClient = useQueryClient()
    const { userId } = useEnigmappContext()

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
            const newPointsToWin = questSession.points_to_win - 2
            await fetchClueAndUpdateRequestedClues(questSession, enigmaId, nextClueIndex, userId)
            await updateQuestSessionPointsToWin(questSession, newPointsToWin)
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['clues', variables.questSession.id, variables.enigmaId],
            })
            queryClient.invalidateQueries({
                queryKey: ['questSession'],
            })
        }
    })
}
