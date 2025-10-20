import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchQuestById, fetchQuests, fetchQuestSessionById } from "../Quests";
import { fetchMostRecentQuestSessionId } from "../Stats";
import { useAuth0 } from "react-native-auth0";
import { fetchCompletedQuestsByAccountId } from "../Account";

export const useGetAccountStats = (): UseQueryResult<{ accountResolvedQuests: number, lastQuestProgression: number, totalAppQuests: number }, Error> => {
    const { user } = useAuth0()
    return useQuery<{ accountResolvedQuests: number, lastQuestProgression: number, totalAppQuests: number }, Error>({
        queryKey: ['accountStats'],
        queryFn: async () => {
            try {
                const appQuests = await fetchQuests()
                const totalAppQuests = appQuests?.length ?? 0
                let totalResolvedCases = 0
                // in percent
                let mostRecentQuestSessionProgress = 0

                if (user) {
                    const mostRecentQuestSessionId = await fetchMostRecentQuestSessionId(user.sub)
                    const accountResolvedCases = await fetchCompletedQuestsByAccountId(user.sub)
                    totalResolvedCases = accountResolvedCases?.length ?? 0

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
                    lastQuestProgression: mostRecentQuestSessionProgress
                }

            } catch (e) {
                console.log('useGetAccountStats error : ', e);
                return {
                    totalAppQuests: 0,
                    accountResolvedQuests: 0,
                    lastQuestProgression: 0
                }

            }
        },
    })
}
