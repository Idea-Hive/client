"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface SpinnerContextType {
    open: () => void;
    close: () => void;
}

const SpinnerContext = createContext<SpinnerContextType | null>(null);

export const useSpinner = () => {
    const context = useContext(SpinnerContext);
    if (!context) {
        throw new Error("useSpinner must be used within SpinnerProvider");
    }
    return context;
};

export function SpinnerProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    const open = () => setIsLoading(true);
    const close = () => setIsLoading(false);

    return (
        <SpinnerContext.Provider value={{ open, close }}>
            {isLoading && <Spinner />}
            {children}
        </SpinnerContext.Provider>
    );
}

function Spinner() {
    return <div className="w-screen h-screen bg-gray-500 bg-opacity-40 z-[9999] flex justify-center items-center fixed top-0 left-0">Loading...</div>;
}
