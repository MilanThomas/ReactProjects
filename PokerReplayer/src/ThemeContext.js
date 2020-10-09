import { createContext } from 'react';

export const themes = {
    classic: {
        colorBlind: false,
        chips: true,
    },
    minimalist: {
        colorBlind: true,
        chips: false,
    },
};

export const ThemeContext = createContext(themes.classic);
