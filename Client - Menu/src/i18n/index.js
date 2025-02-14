import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultData } from "../data/default";
import en from "./en";
import fa from "./fa";
import ar from "./ar";
const resources = {
   en: {
      translation: en,
   },
   fa: {
      translation: fa,
   },
   ar: {
      translation: ar,
   },
};

i18n
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      resources,
      lng: defaultData.languages[0],
      interpolation: {
         escapeValue: false, // react already safes from xss
      },
   });

export default i18n;
