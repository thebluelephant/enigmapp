import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Quest, QuestState } from '@/types/Quest'
import { startQuest } from '@/utils/quest'
import { useEnigmappContext } from '@/utils/EnigmappContext'

export const useStartQuest = () => {
    const { setShowIntroductionModal } = useEnigmappContext()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            questId,
            questState
        }: {
            userId: number,
            questId: Quest['id'],
            questState: QuestState
        }) => {
            return startQuest(userId, questId)
        },
        onSuccess: (data, variables) => {
            if (variables.questState === 'notStarted') {
                setShowIntroductionModal(true)
            }
            queryClient.invalidateQueries({
                queryKey: ['questSession'],
            })

        },

    })
}
