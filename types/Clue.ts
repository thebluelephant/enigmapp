import { Account } from "./Account"
import { Enigma } from "./Quest"
import { QuestSession } from "./QuestSession"

export type Clue = {
    id?: number
    enigma_id: Enigma['id']
    index: number
    clue: { fr: string, en: string }
}

export type RequestedClues = {
    id: number,
    enigma_id: Enigma['id'],
    user_id: Account['user_id'],
    quest_session_id: QuestSession['id']
    clues: { fr: string, en: string }[]
}
