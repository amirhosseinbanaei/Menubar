import { createContext, useEffect, useState } from 'react';
import i18n from '../i18n/index';
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fa');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      setLanguage(storedLanguage);
    } else {
      i18n.changeLanguage('fa');
      localStorage.setItem('language', 'fa');
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
