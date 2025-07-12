import { Enigma } from "./Quest"

export type Clue = {
    id: number
    engima_id: Enigma['id']
    index: number
    clue: string
}