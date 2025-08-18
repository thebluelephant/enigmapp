import { QuestSession } from '@/types/QuestSession'
import { useMutation } from '@tanstack/react-query'
import { updateQuestSessionSolutions } from '../Quests'
import { Enigma } from '@/types/Quest'
import { useEnigmappContext } from '@/utils/EnigmappContext'

export const useUpdateQuestSessionSolutions = () => {
    const { setResultModalStatus } = useEnigmappContext()

    return useMutation({
        mutationFn: async ({
            questSession,
            enigma,
            userSolution,
        }: {
            questSession: QuestSession
            enigma: Enigma
            userSolution: string
        }) => {
            const formattedSolution = {
                quest_id: questSession.quest_id,
                enigma_id: enigma.id,
                solution: userSolution
            }
            return await updateQuestSessionSolutions(questSession, formattedSolution)
        },
        onSuccess: (data, { enigma }) => {
            setResultModalStatus('success', enigma.success_text)
        },
    })
}
