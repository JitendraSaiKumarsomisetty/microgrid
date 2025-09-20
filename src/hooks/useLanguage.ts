import { useState } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('english');

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  return {
    currentLanguage,
    changeLanguage
  };
};