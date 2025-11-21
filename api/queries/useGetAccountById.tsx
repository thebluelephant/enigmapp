import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Account } from "@/types/Account";
import { fetchAccountById } from "../Account";
import { useEnigmappContext } from "@/utils/EnigmappContext";

export const useGetAccountById = (): UseQueryResult<Account | null> => {
    const { userId } = useEnigmappContext()
    return useQuery<Account | null, Error>({
        queryKey: ['account'],
        queryFn: async () => {
            try {
                const response = await fetchAccountById(userId)
                return response
            } catch (e) {
                console.log('useGetAccountById error : ', e);
                return null
            }
        },
    })
}
