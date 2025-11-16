import { QuestSession } from '@/types/QuestSession'
import { useMutation } from '@tanstack/react-query'
import { updateQuestSessionPointsToWin, updateQuestSessionSolutions, updateQuestSessionTriesNumber } from '../Quests'
import { Enigma } from '@/types/Quest'

export const useOnWrongAnswer = () => {

    return useMutation({
        mutationFn: async ({
            questSession,
            enigma
        }: {
            questSession: QuestSession
            enigma: Enigma
        }) => {
            // If there's not enough points to win or the user already tries twice and this try is the third (his last chance) and failed, we redirect to the next enigma
            if (questSession.points_to_win < 2 || questSession.tries_number === 2) {
                // We fill the questSession solution with an automatic error solution 
                const formattedSolution = {
                    quest_id: questSession.quest_id,
                    enigma_id: enigma.id,
                    solution: '_failed_on_last_chance_',
                    points: 0
                }
                await updateQuestSessionSolutions(questSession, formattedSolution)

                //We reset the points to win and the tries number for the next enigma
                await updateQuestSessionPointsToWin(questSession, 7)
                await updateQuestSessionTriesNumber(questSession, 0)
            } else {
                const newPointsToWin = questSession.points_to_win - 1
                const newTriesNumber = questSession.tries_number + 1
                await updateQuestSessionPointsToWin(questSession, newPointsToWin)
                await updateQuestSessionTriesNumber(questSession, newTriesNumber)
            }
        },

    })
}
