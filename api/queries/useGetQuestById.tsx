
import { Quest } from '@/types/Quest';
import { useMutation } from '@tanstack/react-query';
import { fetchQuestById } from '../Quests';

export const useGetQuestById = () => {
    return useMutation({
        mutationFn: async (questId: Quest['id']) => {
            try {
                const response = await fetchQuestById(questId);
                return response;
            } catch (e) {
                console.log('useGetQuestById error : ', e);
                return null;
            }
        },
    });
};
