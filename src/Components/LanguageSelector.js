import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    sessionStorage.setItem('selectedLanguage', lng);
    setShowDropdown(false);
  };
  return (
    <div className='lang-selector'>
      <button className='select' onClick={() => setShowDropdown(!showDropdown)}>
        <img src='/images/icon/language.svg' alt='language' />
      </button>
      {showDropdown && (
        <div className='lang-btn'>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>Spanish</button>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
