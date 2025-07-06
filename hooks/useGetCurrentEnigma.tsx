import { useGetInProgressQuest } from '@/api/queries/useGetInProgressQuest';
import { fetchEnigmaById, fetchQuestById } from '@/api/Quests';
import { Enigma, Quest } from '@/types/Quest';
import { useState, useEffect } from 'react';

const useGetCurrentEnigma = (inProgressQuestId: string) => {
    const { data: inProgressQuest } = useGetInProgressQuest(Number(inProgressQuestId))
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
            if (!inProgressQuest?.quest_id) return;
            const quest = await fetchQuestById(inProgressQuest.quest_id)
            setQuest(quest);
        }
        fetchQuest()
    }, [inProgressQuest]);

    useEffect(() => {
        if (quest && inProgressQuest) {
            const nextEnigmaIndex = (inProgressQuest.solutions?.length ?? 0) + 1
            setNextEnigmaId(quest.enigmas[nextEnigmaIndex])
        }
    }, [inProgressQuest, quest]);

    return { currentEnigma, quest }
};

export default useGetCurrentEnigma;