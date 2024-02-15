import React, { useState } from "react";
import CustomSlider from "./CustomSlider";

const Popup = ({ onClose, children, savedGallary, className }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <img className="guide-top" src="/images/guide-top.png" alt="guide top" />
      <div className={`${className} popup-content`} onClick={(e) => e.stopPropagation()}>
        {savedGallary ? children:<CustomSlider>{children}</CustomSlider>}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
