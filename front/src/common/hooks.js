import { useState, useEffect, useRef, useCallback } from 'react';

export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
};

export const useWindowWidth = () => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return width;
};

export const uesWindowScroll = () => {
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        const onScroll = () => setScroll(window.pageYOffset);
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return scroll;
};

export const useOnFirstRender = (func) => {
    const isFirstRef = useRef(true);
    if (isFirstRef.current) {
        isFirstRef.current = false;
        func();
    }
};

export const usePrevious = (value) => {
    const valueRef = useRef();
    useEffect(() => {
        valueRef.current = value;
    }, [value]);
    return valueRef.current;
};
