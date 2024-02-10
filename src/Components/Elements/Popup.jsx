import React, { useState } from "react";
import CustomSlider from "./CustomSlider";

const Popup = ({ onClose, children }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <img className="guide-top" src="/images/guide-top.png" alt="guide top" />
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <CustomSlider>{children}</CustomSlider>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
