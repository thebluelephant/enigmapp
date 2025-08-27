import { postNewQuestSession } from "@/api/Quests";
import { Quest, QuestState } from "@/types/Quest";
import { QuestSession } from "@/types/QuestSession";
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

export const getQuestState = (quest: Quest, associatedQuestSession?: QuestSession): QuestState => {
    console.log(quest.enigmas?.length, associatedQuestSession);
    if (!associatedQuestSession) {
        return 'notStarted'
    }
    if (associatedQuestSession && quest.enigmas?.length > (associatedQuestSession.solutions?.length ?? 0)) {
        return 'inProgress'
    } else {
        return 'finished'
    }

}