import { useGetQuestSession } from '@/api/queries/useGetQuestSession';
import { fetchEnigmaById, fetchQuestById } from '@/api/Quests';
import { Enigma, Quest } from '@/types/Quest';
import { useState, useEffect } from 'react';

const useGetCurrentEnigma = (questSessionId: string) => {
    const { data: questSession } = useGetQuestSession(Number(questSessionId));
    const [currentEnigma, setCurrentEnigma] = useState<Enigma | null>(null);
    const [quest, setQuest] = useState<Quest | null>()
    const [nextEnigmaId, setNextEnigmaId] = useState<Enigma['id']>();

    useEffect(() => {
        const fetchEnigma = async () => {
            if (!nextEnigmaId) return;
            const enigma = await fetchEnigmaById(nextEnigmaId)
            setCurrentEnigma(enigma);
        }
        fetchEnigma()
    }, [nextEnigmaId]);

    useEffect(() => {
        const fetchQuest = async () => {
            if (!questSession?.quest_id) return;
            const quest = await fetchQuestById(questSession.quest_id)
            setQuest(quest);
        }
        fetchQuest()
    }, [questSession]);

    useEffect(() => {
        if (quest && questSession) {
            const nextEnigmaIndex = (questSession.solutions?.length ?? 0) + 1
            setNextEnigmaId(quest.enigmas[nextEnigmaIndex])
        }
    }, [questSession, quest]);

    return { currentEnigma, quest, questSession }
};

export default useGetCurrentEnigma;