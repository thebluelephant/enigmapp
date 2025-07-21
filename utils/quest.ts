import { postNewQuestSession } from "@/api/Quests";
import { Quest } from "@/types/Quest";
import { router } from "expo-router";

export const startQuest = (userId: number, questId: Quest['id']) => {
    postNewQuestSession(userId, questId)
        .then((questSession) => {
            if (questSession instanceof Error) {
                return;
            } else {
                router.push(`/quest/${questSession?.id}`);
            }
        })
}