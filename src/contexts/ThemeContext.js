import React from 'react';
import useTheme from '../hooks/useTheme'
const ThemeContext = React.createContext();

const THEMELIST = {
  LIGHT: 'light',
  DARK: 'dark'
};

function ThemeProvider({ children, startingTheme }) {

  const state = useTheme(startingTheme);

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider, THEMELIST };