import React, { useState } from 'react';
import GuidePopup from '../Elements/GuidePopup';
import LanguageSelector from '../LanguageSelector';
import ShareButton from '../Elements/ShareButton';

const Footer = ({ t }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-button">
          <LanguageSelector />
        </div>
        <button className="footer-button" onClick={() => setShowPopup(true)}>{t('help')}</button>
        <button className="footer-button" onClick={() => setShowSharePopup(!showSharePopup)}>{t('share')}</button>
      </footer>
      {showPopup && <GuidePopup onClose={() => setShowPopup(false)} t={t} />}
      <ShareButton showSharePopup={showSharePopup} onClose={() => setShowSharePopup(false)} />
    </div>
  );
};

export default Footer;
