type Step = {
    id: string;
    text: string;
    solution: string;
};

export type Enigma = {
    id: string;
    name: string;
    steps: Step[];
    level: number;
    image: string;
    description: string;
};
