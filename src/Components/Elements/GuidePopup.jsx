import React from "react";
import Popup from "./Popup";

const GuidePopup = ({ onClose, t }) => {
  const instructionImages = [
    {
      title: "allow_access",
      img: "1",
    },
    {
      title: "scan_ar_marker",
      img: "2",
    },
    {
      title: "scan_more_marker",
      img: "3",
    },
    {
      title: "save_items_to_your_collection",
      img: "4",
    },
    {
      title: "save_your_collection",
      img: "5",
    },
    {
      title: "ready_tap_the_x",
      img: "6",
    },
  ];

  const renderInstructionImages = () => {
    return instructionImages.map((item, index) => (
      <div key={index} className="slider_item">
        <h2>{t(item.title)}</h2>
        <div className="guide-container">
          <img src={"/images/intro/" + item.img + ".png"} alt={item.title} />
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
