import React, { useState, useEffect } from "react";
import GuidePopup from "../Elements/GuidePopup";
import MindARViewer from "../MindAR/mindar-viewer";

const HomePage = ({ t }) => {
  const [started, setStarted] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Check if the preference is stored in the browser cache
    const isFirstVisit = localStorage.getItem('showGuidePopup') !== 'false';
    setShowPopup(isFirstVisit); // Show the popup only on the first visit
  }, []);

  const handleClosePopup = () => {
    setStarted('aframe')
    setShowPopup(false)
    localStorage.setItem('showGuidePopup', 'false');

  }

  return (
    <div className="app-scan-container">
      <img className="scancamera-bg" src="/images/scan-bg.png" alt="" />
      <div className="control-buttons">
        {started === null && <button className="button" onClick={() => { setStarted('aframe') }}>
          {t('start_scanning')}</button>}
        {started !== null && <button className="button" onClick={() => { setStarted(null) }}>
          {t('stop')}</button>}
      </div>
      {started === 'aframe' && (
        <div className="AR_Scanner">
          <MindARViewer />
          <div className="scanconainer">
            <div className="scanline" />
          </div>start_scanning
        </div>
      )}
      {showPopup && <GuidePopup onClose={handleClosePopup} t={t} />}
    </div>

  );
};

export default HomePage;
