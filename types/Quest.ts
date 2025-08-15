export type Enigma = {
    id: number;
    title: string;
    image: string;
    text: string;
    solution: string[];
    clues: string[];
};

export type Quest = {
    id: number;
    name: string;
    enigmas: number[];
    level: number;
    image: string;
    description: string;
    state?: QuestState
};

export type QuestState = 'notStarted' | 'inProgress'