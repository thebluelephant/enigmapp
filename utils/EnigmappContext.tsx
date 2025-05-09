import type { Quest } from '@/types/Quest';
import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react'

interface EnigmappContextProps {
    showQuestDetails: Quest | null;
    setShowQuestDetails: (quest: Quest | null) => void
    userId: number;
    setUserId: (userId: number) => void
}

const EnigmappContext = createContext<EnigmappContextProps | undefined>(undefined);

const defaultValue: EnigmappContextProps = {
    showQuestDetails: null,
    setShowQuestDetails: () => { },
    userId: 1,
    setUserId: () => { },

}

export const EnigmappContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showQuestDetails, setShowQuestDetails] = useState(defaultValue.showQuestDetails);
    const [userId, setUserId] = useState(defaultValue.userId);

    return (
        <EnigmappContext.Provider value={{ showQuestDetails, setShowQuestDetails, userId, setUserId }}>
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