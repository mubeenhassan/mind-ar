import React, { useState } from 'react';
import GuidePopup from '../Elements/GuidePopup';
import LanguageSelector from '../LanguageSelector';

const Footer = ({ t }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div>

    
    <footer className="footer-container">
      <button className="footer-button">
        <LanguageSelector />
      </button>
      <button className="footer-button" onClick={() => setShowPopup(true)}>{t('help')}</button>
      <button className="footer-button">{t('share')}</button>
    </footer>
    {showPopup && <GuidePopup onClose={() => setShowPopup(false)} t={t}/>}
    </div>
  );
};

export default Footer;
