import { Enigma, Quest } from "./Quest";


export type Solution = {
    quest_id: Quest['id'],
    enigma_id: Enigma['id'],
    solution: unknown
}

export type QuestSession = {
    id: number;
    user_id: number;
    quest_id: number;
    start_date: string;
    solutions: Solution[] | [];
};
