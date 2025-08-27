export type Enigma = {
    id: number;
    title: string;
    image: string;
    text: string;
    solution: string[];
    success_text: string
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

export type QuestState = 'notStarted' | 'inProgress' | 'finished'