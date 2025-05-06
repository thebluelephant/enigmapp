export type Enigma = {
    id: string;
    text: string;
    solution: string;
};

export type Quest = {
    id: number;
    name: string;
    enigmas: Enigma[];
    level: number;
    image: string;
    description: string;
};
