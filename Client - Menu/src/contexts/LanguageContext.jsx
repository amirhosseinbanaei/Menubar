import { createContext, useEffect, useState } from 'react';
import i18n from '../i18n/index';
const LanguageContext = createContext();
import { defaultData } from '../data/default';
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultData.languages[0]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      setLanguage(storedLanguage);
    } else {
      i18n.changeLanguage(defaultData.languages[0]);
      localStorage.setItem('language', defaultData.languages[0]);
    }
  }, []);

  const changeLanguage = (event, languageCode) => {
    if (event) {
      i18n.changeLanguage(event.target.value);
      setLanguage(event.target.value);
    } else {
      i18n.changeLanguage(languageCode);
      setLanguage(languageCode);
    }
    localStorage.setItem('language', i18n.language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
