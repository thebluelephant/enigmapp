import { useGetEnigmaById } from '@/api/queries/useGetEnigmaById';
import { useGetQuestById } from '@/api/queries/useGetQuestById';
import { useGetQuestSession } from '@/api/queries/useGetQuestSession';
import { useEffect } from 'react';

const useGetCurrentEnigma = (questSessionId: string) => {
    const { data: questSession } = useGetQuestSession(Number(questSessionId));
    const { mutate: getEnigmaById, data: currentEnigma } = useGetEnigmaById();
    const { mutate: getQuestById, data: quest } = useGetQuestById();

    useEffect(() => {
        if (questSession) {
            getQuestById(questSession.quest_id)
        }
    }, [questSession]);

    useEffect(() => {
        if (quest && questSession) {
            const nextEnigmaIndex = questSession.solutions.length
            const nextEnigmaId = quest.enigmas[nextEnigmaIndex]
            getEnigmaById(nextEnigmaId)
        }
    }, [questSession, quest]);

    return { currentEnigma, quest, questSession }
};

export default useGetCurrentEnigma;