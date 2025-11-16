import { Translations } from "openai/resources/audio/translations.mjs"
import { Account } from "./Account"
import { TranslationString } from "./Generic"
import { Enigma } from "./Quest"
import { QuestSession } from "./QuestSession"

export type Clue = {
    id?: number
    enigma_id: Enigma['id']
    index: number
    clue: TranslationString
}

export type RequestedClues = {
    id: number,
    enigma_id: Enigma['id'],
    user_id: Account['user_id'],
    quest_session_id: QuestSession['id']
    clues: Translations[]
}
