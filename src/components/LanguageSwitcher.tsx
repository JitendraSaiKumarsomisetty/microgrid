import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.nativeName}
        </span>
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-white/20 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              currentLanguage === language.code ? 'bg-[#0f3057] text-white' : 'text-gray-700'
            }`}
          >
            <div className="font-medium">{language.nativeName}</div>
            <div className="text-xs opacity-75">{language.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;