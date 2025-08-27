import { QuestSession } from '@/types/QuestSession'
import { useMutation } from '@tanstack/react-query'
import { Enigma } from '@/types/Quest'
import { updateQuestSessionPointsToWin, updateQuestSessionScore, updateQuestSessionSolutions, updateQuestSessionTriesNumber } from '../Quests'
import { ResultModalStatus } from '@/components/ResultModal'

export const useOnValidAnswer = () => {
    return useMutation({
        mutationFn: async ({
            questSession,
            enigma,
            userRightAnswer,
        }: {
            questSession: QuestSession
            enigma: Enigma
            userRightAnswer: string
        }): Promise<ResultModalStatus> => {
            const formattedSolution = {
                quest_id: questSession.quest_id,
                enigma_id: enigma.id,
                solution: userRightAnswer,
                points: questSession.points_to_win
            }
            await updateQuestSessionSolutions(questSession, formattedSolution)
            await updateQuestSessionScore(questSession)

            //We reset the points to win and the tries number for the next enigma
            await updateQuestSessionPointsToWin(questSession, 7)
            await updateQuestSessionTriesNumber(questSession, 0)
            return "success"

        }
    })
}
