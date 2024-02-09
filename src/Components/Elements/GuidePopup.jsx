import React from "react";
import Popup from "./Popup";

const GuidePopup = ({ onClose }) => {
  const instructionImages = [
    {
      title: "1. Allow Access",
      img: "img-1",
    },
    {
      title: "2. Scan AR Marker",
      img: "img-2",
    },
    {
      title: "3. Scan More Markers",
      img: "img-3",
    },
    {
      title: "Save Your Collection",
      img: "img-4",
    },
    {
      title: "Ready?! Tap the X to start scanning",
      img: "img-5",
    },
  ];

  const renderInstructionImages = () => {
    return instructionImages.map((item, index) => (
      <div className="slider_item">
        <h2>{item.title}</h2>
        <img src={"/images/" + item.img + ".png"} alt={item.title} />
      </div>
    ));
  };

  return (
    <Popup onClose={onClose}>
      <div className="slider_item">
        <h1>Instructions</h1>
        <ul>
          <li>Step 1: Open the AR App</li>
          <li>Step 2: Scan for AR Marker</li>
          <li>Step 3: Explore AR Content</li>
          <li>Step 4: Back to Scanning Mode</li>
          <li>Step 5: Need Help?</li>
        </ul>
      </div>
      {renderInstructionImages()}
    </Popup>
  );
};

export default GuidePopup;
