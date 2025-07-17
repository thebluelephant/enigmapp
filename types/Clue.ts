import { Enigma } from "./Quest"
import { QuestSession } from "./QuestSession"

export type Clue = {
    id?: number
    enigma_id: Enigma['id']
    index: number
    clue: string
}

export type RequestedClues = {
    id: number,
    enigma_id: Enigma['id'], 
    quest_session_id: QuestSession['id']
    clues: string[]
}
