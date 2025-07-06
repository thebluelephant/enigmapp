import { Enigma } from "./Quest";


type Solution = {
    id: string,
    quest_id: number,
    step_id: string,
    date: string,
    solution: unknown
}

export type QuestSession = {
    id: number;
    user_id: number;
    quest_id: number;
    start_date: string;
    solutions: Solution[] | [];
    clues: {
        enigma_id: Enigma['id']
        clues_asked: number //How many clues (max 3) the user has asked for
    }
};
