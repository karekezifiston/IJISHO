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
      "crime_type": "Type of Crime",
       "crime_type_placeholder": "Type of crime (e.g. robbery, assault...)",
      "date": "When did it happen?",
      "media": "Do you have any photos or videos?",
      "description": "Describe what happened or record audio below:",
      "description_placeholder": "Start typing your report if you're not recording...",
      "record_audio": "Record Audio Explanation:",
      "start": "Start",
      "stop": "Stop",
      "audio_taken": "Audio recorded:",
      "contact_optional": "If possible, could you provide us with your phone number or email to assist us (in case we do not fully understand)? Please write it below:",
      "contact_placeholder": "E.g., 078... or email@example.com",
      "submit": "Submit",
      "report_alert": "Please either write a report or record a voice note.",
      "report_success": "Report submitted successfully!",
      "report_error": "Something went wrong while submitting your report."
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
      "crime_type": "Ubwoko bw'icyaha",
      "crime_type_placeholder": "Ubwoko bw’icyaha (urugero. kwiba, gukubita...)",
      "date": "Byabaye ryari?",
      "media": "Waba ufite amashusho cyangwa amafoto?",
      "description": "Sobanura uko byagenze cyangwa ufate amajwi usobanurira hasi:",
      "description_placeholder": "Tangirira hano wandike ibisobanuro niba udafite amajwi...",
      "record_audio": "Fata Amajwi usobanurira:",
      "start": "Tangira",
      "stop": "Hagarika",
      "audio_taken": "Amajwi wafashe:",
      "contact_optional": "Niba binashoboka ushobora kuduha nimero cg email byadufasha (mugihe tutasobanukiwe neza), andika hasi:",
      "contact_placeholder": "Urugero, 078... cyangwa email@example.com",
      "submit": "Ohereza",
      "report_alert": "Nyamuneka wandike ibisobanuro cyangwa ufate amajwi.",
      "report_success": "Amakuru yatanzwe neza!",
      "report_error": "Habaye ikibazo mu gutanga amakuru."
    }
  },
  fr: {
    translation: {
      "home": "Accueil",
      "about": "À propos",
      "report_title": "Signaler un crime",
      "district": "District",
      "sector": "Secteur",
      "cell": "Cellule",
      "crime_type": "Type de crime",
      "crime_type_placeholder": "Type de crime (ex. vol, agression...)",
      "date": "Quand cela s'est-il produit ?",
      "media": "Avez-vous des photos ou des vidéos ?",
      "description": "Décrivez ce qui s'est passé ou enregistrez un audio ci-dessous :",
      "description_placeholder": "Commencez à taper votre rapport si vous n'enregistrez pas...",
      "record_audio": "Enregistrer une explication audio :",
      "start": "Démarrer",
      "stop": "Arrêter",
      "audio_taken": "Audio enregistré :",
      "contact_optional": "Si possible, pourriez-vous nous fournir votre numéro de téléphone ou votre e-mail pour nous aider (au cas où nous ne comprendrions pas entièrement) ? Veuillez l'écrire ci-dessous :",
      "contact_placeholder": "Par ex. 078... ou email@example.com",
      "submit": "Soumettre",
      "report_alert": "Veuillez soit écrire un rapport, soit enregistrer un message vocal.",
      "report_success": "Rapport soumis avec succès !",
      "report_error": "Une erreur s'est produite lors de la soumission du rapport."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
