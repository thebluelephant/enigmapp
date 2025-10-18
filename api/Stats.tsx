import { Account } from "@/types/Account";
import { supabase } from "./core";

export const fetchMostRecentQuestSessionId = async (userId: Account['user_id']) => {
    const { data, error } = await supabase
        .from('accounts')
        .select('in_progress_quests')
        .eq('user_id', userId)

    if (error) {
        console.log("fetchMostRecentQuestSessionId error : ", error);
    }

    if (data?.[0].in_progress_quests.length) {
        return data?.[0].in_progress_quests?.pop().quest_session_id
    } else return null

}
