import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    sessionStorage.setItem('selectedLanguage', lng);
    setShowDropdown(false);
  };

  return (
    <div className='lang-selector'>
     <button className='select' onClick={() => setShowDropdown(!showDropdown)}>
      {i18n.language === 'en' ? 'English' : 'Spanish'}
    </button>
      {showDropdown &&(
        <div className='lang-btn'>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>Spanish</button>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
