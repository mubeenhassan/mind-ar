import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GuidePopup from '../Elements/GuidePopup';
import LanguageSelector from '../LanguageSelector';
import ShareButton from '../Elements/ShareButton';
import Popup from '../Elements/Popup';
import SavedGallery from '../Elements/SavedGallery';

const Footer = ({ t }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupSavedItem, setShowPopupSavedItem] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isMarkerPath, setIsMarkerPath] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const galleryParam = params.get('gallery');
    if (galleryParam === 'true') {
      setShowPopupSavedItem(true);
    }
  }, [location]);

  useEffect(() => {
    setIsMarkerPath(location.pathname.includes('/marker/'));
  }, [location.pathname]);

  const handleShowSavedGallery = () => {
    setShowPopupSavedItem(!showPopupSavedItem);
    const urlParams = new URLSearchParams(location.search);
    if (showPopupSavedItem) {
      urlParams.delete('gallery');
    } else {
      urlParams.set('gallery', 'true');
    }
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  const handleClose = () => {
    setShowPopupSavedItem(false);
    const urlParams = new URLSearchParams(location.search);
    urlParams.delete('gallery');
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  return (
    <div className={!showSharePopup && 'main-footer'}>
      <footer className="footer-container">
        <div className='clip-path-footer' />
        <div className="footer-button" onClick={() => setShowPopup(true)}>
          <img src='/images/icon/help.svg' alt='help' />
        </div>
        <div className="footer-button">
          <LanguageSelector />
        </div>

        <div className={`footer-button ${!isMarkerPath ? 'disabled' : ''}`} onClick={isMarkerPath ? handleShowSavedGallery : null}>
          <img src='/images/icon/star.svg' alt='star' />
        </div>
        <div className="footer-button" onClick={() => setShowSharePopup(!showSharePopup)}>
          <img src='/images/icon/share.svg' alt='share' />
        </div>
      </footer>
      {showPopupSavedItem && <Popup savedGallary onClose={handleClose} className="saved-gallery">
        <SavedGallery t={t} />
      </Popup>}
      {showPopup && <GuidePopup onClose={() => setShowPopup(false)} t={t} />}
      <ShareButton showSharePopup={showSharePopup} onClose={() => setShowSharePopup(false)} />
    </div>
  );
};

export default Footer;
