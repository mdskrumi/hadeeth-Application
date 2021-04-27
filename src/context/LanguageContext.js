import React, { useState } from "react";

const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("bn");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
