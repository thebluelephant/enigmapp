import { Quest } from "./Quest";
import { QuestSession } from "./QuestSession";

export type Account = {
    user_id: string,
    created_at: string,
    username: string,
    completed_quests: MinimizedQuest[],
    in_progress_quests: MinimizedQuest[]
};

export type MinimizedQuest = {
    quest_id: Quest['id'],
    quest_session_id: QuestSession['id']
    started_at: Date,
    ended_at: Date | null,
    score: QuestSession['score']
}