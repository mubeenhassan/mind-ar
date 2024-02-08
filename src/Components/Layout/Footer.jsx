import React, {useState} from 'react';
import GuidePopup from '../Elements/GuidePopup';

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <footer className="footer-container">
      <button className="footer-button">English</button>
      <button className="footer-button" onClick={()=>setShowPopup(true)}>Help</button>
      <button className="footer-button">Share</button>
      {showPopup && <GuidePopup onClose={()=>setShowPopup(false)} />}
    </footer>
  );
};

export default Footer;
