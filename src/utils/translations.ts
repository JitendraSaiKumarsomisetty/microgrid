export const translations = {
  english: {
    dashboard: 'Dashboard',
    forecasting: 'Forecasting',
    analytics: 'Analytics',
    alerts: 'Alerts',
    config: 'Configuration',
    diagnostics: 'Diagnostics',
    scenarios: 'Scenarios',
    community: 'Community',
    indiaMap: 'India Map'
  },
  hindi: {
    dashboard: 'डैशबोर्ड',
    forecasting: 'पूर्वानुमान',
    analytics: 'विश्लेषण',
    alerts: 'अलर्ट',
    config: 'कॉन्फ़िगरेशन',
    diagnostics: 'निदान',
    scenarios: 'परिदृश्य',
    community: 'समुदाय',
    indiaMap: 'भारत मानचित्र'
  },
  odia: {
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    forecasting: 'ପୂର୍ବାନୁମାନ',
    analytics: 'ବିଶ୍ଳେଷଣ',
    alerts: 'ଆଲର୍ଟ',
    config: 'ବିନ୍ୟାସ',
    diagnostics: 'ନିଦାନ',
    scenarios: 'ପରିସ୍ଥିତି',
    community: 'ସମ୍ପ୍ରଦାୟ',
    indiaMap: 'ଭାରତ ମାନଚିତ୍ର'
  }
};

export const getTranslation = (key: string, language: string): string => {
  const languageTranslations = translations[language as keyof typeof translations];
  if (languageTranslations && languageTranslations[key as keyof typeof languageTranslations]) {
    return languageTranslations[key as keyof typeof languageTranslations];
  }
  // Fallback to English if translation not found
  return translations.english[key as keyof typeof translations.english] || key;
};