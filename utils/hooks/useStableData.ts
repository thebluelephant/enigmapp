import { useGetActiveEnigma } from "@/api/queries/useGetActiveEnigma";
import { useGetQuestSessionById } from "@/api/queries/usetGetQuestSessionById";
import { Enigma, Quest } from "@/types/Quest";
import { QuestSession } from "@/types/QuestSession";
import { useRef, useEffect } from "react";

// Use previous data if questSession, quest or enigma is "null" during the refetch of their data. Avoid to have a blink in the page.
export default function useStableData(questSessionId: QuestSession['id']) {
    // We need to use a Query to be able to invalidate it in some places and refresh data
    const { data: questSession } = useGetQuestSessionById(Number(questSessionId))
    const { mutate: getActiveEnigma, data: activeEnigma } = useGetActiveEnigma();

    const previousQuestSessionRef = useRef<QuestSession | null>(null)
    const safeQuestSession = questSession ?? previousQuestSessionRef.current

    const previousActiveEnigmaRef = useRef<{ enigma: {}; quest: Quest; questSession: QuestSession; } | { enigma: Enigma | null; quest: Quest; questSession: QuestSession; } | null>(null)
    const safeActiveEnigma = activeEnigma ?? previousActiveEnigmaRef.current


    useEffect(() => {
        if (questSession) {
            getActiveEnigma({ questSession: questSession })
            previousQuestSessionRef.current = questSession
        }
    }, [questSession]);

    useEffect(() => {
        if (activeEnigma) {
            previousActiveEnigmaRef.current = activeEnigma
        }
    }, [activeEnigma]);

    return {
        questSession: safeQuestSession,
        quest: safeActiveEnigma?.quest,
        enigma: safeActiveEnigma?.enigma
    };
}