import React, { useState } from 'react';
import GuidePopup from '../Elements/GuidePopup';
import LanguageSelector from '../LanguageSelector';
import ShareButton from '../Elements/ShareButton';

const Footer = ({ t }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  return (
    <div className={!showSharePopup && 'main-footer'}>
      <footer className="footer-container">
        <div className='clip-path-footer' />
        <div className="footer-button">
          <LanguageSelector />
        </div>
        <div className="footer-button" onClick={() => setShowPopup(true)}>
          <img src='/images/icon/help.svg' alt='help' />
        </div>
        <div className="footer-button" onClick={() => setShowPopup(true)}>
          <img src='/images/icon/star.svg' alt='star' />
        </div>
        <div className="footer-button" onClick={() => setShowSharePopup(!showSharePopup)}>
          <img src='/images/icon/share.svg' alt='share' />
        </div>
      </footer>
      {showPopup && <GuidePopup onClose={() => setShowPopup(false)} t={t} />}
      <ShareButton showSharePopup={showSharePopup} onClose={() => setShowSharePopup(false)} />
    </div>
  );
};

export default Footer;
