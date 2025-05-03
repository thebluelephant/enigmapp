import type { Enigma } from '@/types/Enigma';
import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react'

interface EnigmappContextProps {
    showEnigmaDetails: Enigma | null;
    setShowEnigmaDetails: (enigma: Enigma | null) => void
}

const EnigmappContext = createContext<EnigmappContextProps | undefined>(undefined);

const defaultValue: EnigmappContextProps = {
    showEnigmaDetails: null,
    setShowEnigmaDetails: () => { },
}

export const EnigmappContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showEnigmaDetails, setShowEnigmaDetails] = useState(defaultValue.showEnigmaDetails);

    return (
        <EnigmappContext.Provider value={{ showEnigmaDetails, setShowEnigmaDetails }}>
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