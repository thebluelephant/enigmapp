

type Solution = {
    id: string,
    quest_id: number,
    step_id: string,
    date: string,
    solution: unknown
}

export type InProgressQuest = {
    id: string;
    user_id: number;
    quest_id: number;
    start_date: string;
    solutions: Solution[] | [];
};
