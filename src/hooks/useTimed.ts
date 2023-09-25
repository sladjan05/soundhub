'use client';

import { SetStateAction, useRef, useState } from 'react';

export default function useTimed<T>(baseValue: T, timeMs: number = 2000) {
    const timeout = useRef<NodeJS.Timeout>();
    const [state, setState] = useState(baseValue);

    function setValue(value: SetStateAction<T>) {
        setState(value);

        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setValue(baseValue);
        }, timeMs);
    }

    return [state, setValue] as const;
}
