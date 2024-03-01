import React, { useState, useEffect } from "react";
import GuidePopup from "../Elements/GuidePopup";
import MindARViewer from "../MindAR/mindar-viewer";

const HomePage = ({ t }) => {
  const [started, setStarted] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('showGuidePopup') !== 'false';
    setShowPopup(isFirstVisit); // Show the popup only on the first visit
  }, [started]);

  const handleClosePopup = () => {
    setStarted('aframe')
    setShowPopup(false)
    localStorage.setItem('showGuidePopup', 'false');

  }
  const handleStart = () => {
    setStarted('aframe')
   }

  return (
    <div className="app-scan-container">
      <img className="scancamera-bg" src="/images/UI_scanning.png" alt="" />
      {/* <div className="pb-90" /> */}
      <div className="control-buttons">
        {started === null && <button className="button" onClick={handleStart}>
          {t('start_scanning')}</button>}
        {started !== null && <button className="button" onClick={() => { setStarted(null) }}>
          {t('stop')}</button>}
      </div>

      {started === 'aframe' && (
        <div className="AR_Scanner">
          <MindARViewer />
          <div className="scanconainer">
            <div className="scanline" />
          </div>
        </div>
      )}
      {showPopup && <GuidePopup onClose={handleClosePopup} t={t} />}
    </div>

  );
};

export default HomePage;
