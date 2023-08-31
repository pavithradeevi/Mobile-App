// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showMst, setShowMst] = useState(true);

  const toggleTimezone = () => {
    setShowMst((prevState) => !prevState);
  };

  return (
    <AppContext.Provider value={{ showMst, toggleTimezone }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
