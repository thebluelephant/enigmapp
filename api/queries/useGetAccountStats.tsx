import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchQuestById, fetchQuests, fetchQuestSessionById } from "../Quests";
import { fetchMostRecentQuestSessionId } from "../Stats";
import { fetchCompletedQuestsByAccountId } from "../Account";
import { useEnigmappContext } from "@/utils/EnigmappContext";

export const useGetAccountStats = (): UseQueryResult<{ accountResolvedQuests: number, lastQuestProgression: number, totalAppQuests: number, totalScore: number }, Error> => {
    const { userId } = useEnigmappContext()
    return useQuery<{ accountResolvedQuests: number, lastQuestProgression: number, totalAppQuests: number, totalScore: number }, Error>({
        queryKey: ['accountStats'],
        queryFn: async () => {
            try {
                const appQuests = await fetchQuests()
                const totalAppQuests = appQuests?.length ?? 0
                let totalResolvedCases = 0
                let totalScore = 0
                // in percent
                let mostRecentQuestSessionProgress = 0

                if (userId) {
                    const mostRecentQuestSessionId = await fetchMostRecentQuestSessionId(userId)
                    const accountResolvedCases = await fetchCompletedQuestsByAccountId(userId)
                    totalResolvedCases = accountResolvedCases?.length ?? 0
                    totalScore = accountResolvedCases?.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.score,
                        0,
                    )

                    if (mostRecentQuestSessionId) {
                        const questSession = await fetchQuestSessionById(mostRecentQuestSessionId)

                        if (questSession) {
                            const quest = await fetchQuestById(questSession?.quest_id)
                            if (quest) {
                                const progression = questSession?.solutions?.length / (quest?.enigmas?.length ?? 1);
                                mostRecentQuestSessionProgress = Math.round(progression * 100)
                            }
                        }
                    }
                }

                return {
                    totalAppQuests,
                    accountResolvedQuests: totalResolvedCases,
                    lastQuestProgression: mostRecentQuestSessionProgress,
                    totalScore
                }

            } catch (e) {
                console.log('useGetAccountStats error : ', e);
                return {
                    totalAppQuests: 0,
                    accountResolvedQuests: 0,
                    lastQuestProgression: 0,
                    totalScore: 0
                }

            }
        },
    })
}
