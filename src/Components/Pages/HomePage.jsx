import React, { useState } from "react";
import MindARViewer from "../MindAR/mindar-viewer";

const HomePage = () => {
  const [started, setStarted] = useState(null);

  return (
    <div className="App">
      <h1>Example React component with MindAR</h1>
      <div className="control-buttons">
        {started === null && <button onClick={() => {setStarted('aframe')}}>Start AFRAME version</button>}
        {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
      </div>
      {started === 'aframe' && (
        <div className="AR_Scanner">
          <MindARViewer/>
          <video></video>
        </div>
      )}
    </div>

  );
};

export default HomePage;
