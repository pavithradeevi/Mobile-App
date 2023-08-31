import React from 'react';
import {light, lightTheme} from '../constants';

export const ThemeContext = React.createContext({
  theme: lightTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  theme = lightTheme,
  setTheme = () => {},
}) => {
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default useDefaultTheme = () => {
  const {theme} = React.useContext(ThemeContext);
  return theme;
};
