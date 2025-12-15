import type { Quest } from "@/types/Quest"
import { supabase } from "./core"
import { Account, MinimizedQuest, OnboardingReason } from "@/types/Account"
import { QuestSession } from "@/types/QuestSession"

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export const insertAccount = async (userId: Account['user_id'], email: Account['email']) => {
    const accountAlreadyExist = await fetchAccountById(userId)

    if (!accountAlreadyExist) {
        const { data: account, error } = await supabase
            .from('accounts')
            .insert({ user_id: userId, email: email })
            .select()

        if (error) {
            console.log("fetchAccountById error : ", error);
        }
        return account?.[0]
    }

}
export const fetchAccountById = async (userId: Account['user_id']): Promise<Account> => {
    const { data, error } = await supabase
        .from('accounts')
        .select()
        .eq('user_id', userId)

    if (error) {
        console.log("fetchAccountById error : ", error);
    }
    return data?.[0]
}
export const fetchCompletedQuestsByAccountId = async (userId: Account['user_id']): Promise<MinimizedQuest[]> => {
    const { data, error } = await supabase
        .from('accounts')
        .select('completed_quests')
        .eq('user_id', userId)

    if (error) {
        console.log("fetchCompletedQuestsByAccountId error : ", error);
    }
    return data?.[0].completed_quests
}

export const updateAccountWithNewInProgressQuest = async (userId: Account['user_id'], questId: Quest['id'], questSessionId: QuestSession['id'], score: QuestSession['score']) => {
    const newQuest: MinimizedQuest = {
        quest_session_id: questSessionId,
        quest_id: questId,
        started_at: new Date(),
        ended_at: null,
        score: score
    }
    const account = await fetchAccountById(userId)

    if (account) {
        const updatedInProgressQuests = [...(account.in_progress_quests ?? []), newQuest];
        const { data, error } = await supabase
            .from('accounts')
            .update({ in_progress_quests: updatedInProgressQuests })
            .eq('user_id', account.user_id)
            .select()

        if (error) {
            console.log("updateAccountWithNewInProgressQuest error : ", error);
        }
        return data?.[0]
    }
}
export const updateAccountWithDeletedInProgressQuest = async (userId: Account['user_id'], questId: Quest['id'], questSessionId: QuestSession['id']) => {
    const account = await fetchAccountById(userId)

    if (account) {
        // We delete the concerned entry from the "in progress quests" to update the complete list of in progress quests
        const updatedInProgressQuests = account.in_progress_quests.filter(((ipq: MinimizedQuest) => ipq.quest_session_id != questSessionId))
        const { data, error } = await supabase
            .from('accounts')
            .update({ in_progress_quests: updatedInProgressQuests })
            .eq('user_id', account.user_id)
            .select()

        if (error) {
            console.log("updateAccountWithDeletedInProgressQuest error : ", error);
        }
        return data?.[0]
    }
}
export const updateAccountWithCompletedOnboarding = async (userId: Account['user_id'], reason: OnboardingReason) => {
    const { data, error } = await supabase
        .from('accounts')
        .update({ onboarded: reason })
        .eq('user_id', userId)
        .select()

    if (error) {
        console.log("updateAccountWithCompletedOnboarding error : ", error);
    }
    return data?.[0]

}
export const updateAccountWithUsername = async (userId: Account['user_id'], username: Account['username']): Promise<Account> => {
    const { data, error } = await supabase
        .from('accounts')
        .update({ username: username })
        .eq('user_id', userId)
        .select()

    if (error) {
        console.log("updateAccountWithUsername error : ", error);
    }
    return data?.[0]

}
export const updateAccountWithCompletedQuest = async (userId: Account['user_id'], questId: Quest['id'], score: QuestSession['score']) => {
    const account: Account = await fetchAccountById(userId)

    if (account) {
        const initialStartedQuest = account.in_progress_quests.find((quest) => quest.quest_id === questId)

        const completedQuest = {
            ...initialStartedQuest,
            ended_at: new Date(),
            score: score
        }

        if (account) {
            const updatedCompletedQuests = [...(account.completed_quests ?? []), completedQuest];
            const { data, error } = await supabase
                .from('accounts')
                .update({ 'completed_quests': updatedCompletedQuests })
                .eq('user_id', account.user_id)
                .select()

            if (error) {
                console.log("updateAccountWithCompletedQuest error : ", error);
            }
            return data?.[0]
        }
    }


}