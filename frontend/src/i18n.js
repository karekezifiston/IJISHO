// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "about": "About",
      "report_title": "Report a Crime",
      "district": "District",
      "sector": "Sector",
      "cell": "Cell",
      "date": "When did it happen?",
      "media": "Do you have any photos or videos?",
      "description": "Describe what happened or record audio below:",
      "description_placeholder": "Start typing your report if you're not recording...",
      "record_audio": "Record Audio Explanation:",
      "start": "Start",
      "stop": "Stop",
      "audio_taken": "Audio recorded:",
      "contact_optional": "If you want to reveal your identity, please enter your contact below:",
      "contact_placeholder": "E.g., 078... or email@example.com",
      "submit": "Submit",
      "report_alert": "Please either write a report or record a voice note."
    }
  },
  rw: {
    translation: {
      "home": "Ahabanza",
      "about": "Ibyerekeye",
      "report_title": "Tanga amakuru ku cyaha",
      "district": "Intara/Akarere",
      "sector": "Umurenge",
      "cell": "Akagari",
      "date": "Byabaye ryari?",
      "media": "Waba ufite amashusho cyangwa amafoto?",
      "description": "Sobanura uko byagenze cyangwa ufate amajwi usobanurira hasi:",
      "description_placeholder": "Tangirira hano wandike ibisobanuro niba udafite amajwi...",
      "record_audio": "Fata Amajwi usobanurira:",
      "start": "Tangira",
      "stop": "Hagarika",
      "audio_taken": "Amajwi wafashe:",
      "contact_optional": "Niba ushaka kwivuga imyirondoro yawe, andika hasi:",
      "contact_placeholder": "Urugero, 078... cyangwa email@example.com",
      "submit": "Ohereza",
      "report_alert": "Nyamuneka wandike ibisobanuro cyangwa ufate amajwi."
    }
  }
};

i18n
  .use(LanguageDetector) // <-- Add the detector plugin here
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    // Remove explicit "lng" to let LanguageDetector handle this
    detection: {
      // Optional: customize detection options
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
