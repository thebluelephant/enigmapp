import { postNewQuestSession } from "@/api/Quests";
import { Quest, QuestState } from "@/types/Quest";
import { QuestSession } from "@/types/QuestSession";

export const startQuest = async (userId: string, questId: Quest['id']) => {
    return postNewQuestSession(userId, questId)
        .then((questSession) => {
            if (questSession instanceof Error) {
                return;
            } else {
                return questSession
            }
        })
}

export const getQuestState = (quest: Quest, associatedQuestSession?: QuestSession): QuestState => {
    if (!associatedQuestSession) {
        return 'notStarted'
    }
    if (associatedQuestSession && quest.enigmas?.length > (associatedQuestSession.solutions?.length ?? 0)) {
        return 'inProgress'
    } else {
        return 'finished'
    }

}

export const getQuestButtonWordingFromState = (state: QuestState) => {
    if (state === 'inProgress') {
        return 'Continuer'
    } else if (state === 'notStarted') {
        return 'Commencer'
    } else return 'Quête terminée'
}