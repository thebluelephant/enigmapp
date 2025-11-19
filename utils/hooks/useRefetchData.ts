import { useGetAccountStats } from '@/api/queries/useGetAccountStats';
import { useGetQuests } from '@/api/queries/useGetQuests';
import { useGetUserQuestSessions } from '@/api/queries/useGetUserQuestSessionIds';
import { useEnigmappContext } from '../EnigmappContext';
import { useState } from 'react';

export default function useRefetchData() {
    const { userId } = useEnigmappContext()
    const { refetch: refetchQuests } = useGetQuests();
    const { refetch: refetchQuestSession } = useGetUserQuestSessions(userId);
    const { refetch: refetchStats } = useGetAccountStats()
    const [refreshing, setRefreshing] = useState(false);

    const refetch = async () => {
        setRefreshing(true)
        refetchQuests()
        refetchQuestSession()
        refetchStats()
        setRefreshing(false)
    };

    return {
        refetch,
        refreshing
    };
}