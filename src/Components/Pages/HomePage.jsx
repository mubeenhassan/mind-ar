import React, { useState } from "react";
import GuidePopup from "../Elements/GuidePopup";
import MindARViewer from "../MindAR/mindar-viewer";

const HomePage = () => {
  const [started, setStarted] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup=()=>{
    setStarted('aframe')
    setShowPopup(false)
  }

  return (
    <div className="App">
      <h1>Example React component with MindAR</h1>
      <div className="control-buttons">
        {started === null && <button onClick={() => {setStarted('aframe')}}>Start Scanning</button>}
        {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
      </div>
      {started === 'aframe' && (
        <div className="AR_Scanner">
          <MindARViewer/>
          <video></video>
        </div>
      )}
      {showPopup && <GuidePopup onClose={handleClosePopup} />}
    </div>

  );
};

export default HomePage;
