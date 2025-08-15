
import { Enigma } from '@/types/Quest';
import { useMutation } from '@tanstack/react-query';
import { fetchEnigmaById } from '../Quests';

export const useGetEnigmaById = () => {
    return useMutation({
        mutationFn: async (enigmaId: Enigma['id']) => {
            try {
                const response = await fetchEnigmaById(enigmaId);
                return response;
            } catch (e) {
                console.log('useGetEnigmaById error : ', e);
                return null;
            }
        },
    });
};
