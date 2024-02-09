import React from "react";
import Popup from "./Popup";

const GuidePopup = ({ onClose, t }) => {

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
        <h2>{index + 1}{item.title}</h2>
        <div className="guide-container">
          <img src={"/images/" + item.img + ".png"} alt={item.title} />

        </div>
      </div>
    ));
  };

  return (
    <Popup onClose={onClose}>
      <div className="slider_item  steps-guite guide-container">
        <h1>{t('instructions')}</h1>
        <ul>
          <li>{t('help_step_1')}</li>
          <li>{t('help_step_2')}</li>
          <li>{t('help_step_3')}</li>
          <li>{t('help_step_4')}</li>
          <li>{t('help_step_5')}</li>

        </ul>
      </div>
      {renderInstructionImages()}
    </Popup>
  );
};

export default GuidePopup;
