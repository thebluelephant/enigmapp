import { postNewQuestSession } from "@/api/Quests";
import { Quest, QuestState } from "@/types/Quest";
import { QuestSession } from "@/types/QuestSession";
import { I18n } from "i18n-js";

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

export const getQuestButtonWordingFromState = (state: QuestState, i18n: I18n) => {
    if (state === 'inProgress') {
        return i18n.t('utils-quest.button-continue')
    } else if (state === 'notStarted') {
        return i18n.t('utils-quest.button-not-started')
    } else return i18n.t('utils-quest.button-finished')
}