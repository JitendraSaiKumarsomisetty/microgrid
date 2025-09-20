import { useState, useCallback } from 'react';
import { Language } from '../types';

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'od', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  const changeLanguage = useCallback((languageCode: string) => {
    setCurrentLanguage(languageCode);
  }, []);

  const getCurrentLanguage = useCallback(() => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  }, [currentLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    getCurrentLanguage,
    languages
  };
};