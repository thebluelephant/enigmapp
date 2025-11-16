import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Quest, QuestState } from '@/types/Quest'
import { startQuest } from '@/utils/quest'
import { useEnigmappContext } from '@/utils/EnigmappContext'
import { useRouter } from 'expo-router'

export const useStartQuest = () => {
    const router = useRouter()
    const { setShowIntroductionModal } = useEnigmappContext()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            questId,
        }: {
            userId: string,
            questId: Quest['id'],
            questState: QuestState
        }) => {
            const questSession = await startQuest(userId, questId)
            if (questSession) {
                router.push(`/quest/${questSession?.id}`);
            }
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
