export type Enigma = {
    id: number;
    title: string;
    image: string;
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
