import type { Quest } from '@/types/Quest';
import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react'

interface EnigmappContextProps {
    showQuestDetails: Quest | null;
    setShowQuestDetails: (quest: Quest | null) => void
    resultModalStatus: { status: 'success' | 'error' | 'error_last_chance' | null, text?: string },
    setResultModalStatus: (status: 'success' | 'error' | 'error_last_chance' | null, text?: string) => void,
    userId: number;
    setUserId: (userId: number) => void
}

const EnigmappContext = createContext<EnigmappContextProps | undefined>(undefined);

const defaultValue: EnigmappContextProps = {
    showQuestDetails: null,
    setShowQuestDetails: () => { },
    userId: 1,
    setUserId: () => { },
    resultModalStatus: { status: null },
    setResultModalStatus: () => { },
}

export const EnigmappContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showQuestDetails, setShowQuestDetails] = useState(defaultValue.showQuestDetails);
    const [userId, setUserId] = useState(defaultValue.userId);
    const [resultModalStatus, setResultModalStatus] = useState(defaultValue.resultModalStatus)


    return (
        <EnigmappContext.Provider value={{
            showQuestDetails,
            setShowQuestDetails,
            userId,
            setUserId,
            resultModalStatus,
            setResultModalStatus: (status: 'success' | 'error' | 'error_last_chance' | null, text?: string) => {
                setResultModalStatus({ status, text });
            },
        }}>
            {children}
        </EnigmappContext.Provider>
    );
};

export const useEnigmappContext = (): EnigmappContextProps => {
    const context = useContext(EnigmappContext);
    if (!context) {
        throw new Error('useEnigmappContext must be used within an EnigmappContextProvider');
    }
    return context;
};