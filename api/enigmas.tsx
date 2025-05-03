import type { Enigma } from "@/types/Enigma"
import { supabase } from "./core"

export const fetchEnigmas = async (): Promise<Enigma[] | Error | null> => {
    const { data, error } = await supabase
        .from('enigmas')
        .select()
    if (error) {
        throw new Error(error.message)
    }
    return data
}