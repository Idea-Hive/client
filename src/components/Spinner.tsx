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
    return (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-40 z-[9999] flex justify-center items-center fixed top-0 left-0">
            <div className="w-[60px] h-[60px] animate-spin">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="6.25" r="6.25" fill="#FF6363" />
                    <circle cx="30" cy="53.75" r="6.25" fill="#D9D9D9" />
                    <circle cx="6.25" cy="30" r="6.25" transform="rotate(-90 6.25 30)" fill="#D9D9D9" />
                    <circle cx="53.75" cy="30" r="6.25" transform="rotate(-90 53.75 30)" fill="#D9D9D9" />
                    <circle cx="13.2063" cy="13.2063" r="6.25" transform="rotate(-45 13.2063 13.2063)" fill="#D9D9D9" />
                    <circle cx="46.7939" cy="46.7938" r="6.25" transform="rotate(-45 46.7939 46.7938)" fill="#D9D9D9" />
                    <circle cx="46.7939" cy="13.2063" r="6.25" transform="rotate(45 46.7939 13.2063)" fill="#D9D9D9" />
                    <circle cx="13.2063" cy="46.7938" r="6.25" transform="rotate(45 13.2063 46.7938)" fill="#D9D9D9" />
                </svg>
            </div>
        </div>
    );
}

export default Spinner;
