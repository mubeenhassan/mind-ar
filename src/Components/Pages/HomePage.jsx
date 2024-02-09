import React, { useState } from "react";
import GuidePopup from "../Elements/GuidePopup";
import MindARViewer from "../MindAR/mindar-viewer";

const HomePage = ({ t }) => {
  const [started, setStarted] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setStarted('aframe')
    setShowPopup(false)
  }

  return (
    <div className="app-scan-container">
      <div className="control-buttons">
        {started === null && <button className="button" onClick={() => { setStarted('aframe') }}>Start Scanning</button>}
        {started !== null && <button className="button" onClick={() => { setStarted(null) }}>Stop</button>}
      </div>
      {started === 'aframe' && (
        <div className="AR_Scanner">
          <MindARViewer />
          {/* <video></video> */}
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
