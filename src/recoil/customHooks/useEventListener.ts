import { useRef, useEffect } from "react";

// https://usehooks.com/useEventListener
export const useEventListener = (eventName: string, handler: (e: MessageEvent) => void, element = window) => {
    const savedHandler = useRef<(e: MessageEvent) => void>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;
            const eventListener = (event: any) => savedHandler.current(event);
            element.addEventListener(eventName, eventListener);
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element]
    );
};