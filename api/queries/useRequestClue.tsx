import { QuestSession } from '@/types/QuestSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchClueAndUpdateRequestedClues } from '../Clues'

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
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['clues', variables.questSession.id, variables.enigmaId],
            })
        },
    })
}
