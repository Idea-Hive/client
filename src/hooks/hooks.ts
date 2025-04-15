"use client";

import { RefObject, useEffect } from "react";

/**
 * 요소 외부 클릭을 감지하는 훅
 * @param ref 감지할 요소의 ref
 * @param handler 외부 클릭 시 실행할 콜백 함수
 */
export const useClickOutside = (ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
