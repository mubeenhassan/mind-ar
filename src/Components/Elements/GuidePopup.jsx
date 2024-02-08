import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GuidePopup = ({ isOpen, onClose }) => {
  const [slider, setSlider] = useState(null);
  const instructionImages=[
    {
        title:'1. Allow Access',
        img:'img-1',
    },{
        title:'2. Scan AR Marker',
        img:'img-2',
    },{
        title:'3. Scan More Markers',
        img:'img-3',
    },{
        title:'Save Your Collection',
        img:'img-4',
    },{
        title:'Ready?! Tap the X to start scanning',
        img:'img-5',
    },
  ]

  const CustomPrevButton = ({ onClick }) => (
    <button className="prev-arrow-button" onClick={onClick}>
      <img src="/images/arrow-prev.svg" alt="Prev Button" />
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button className="next-arrow-button" onClick={onClick}>
            <img src="/images/arrow-next.svg" alt="Next Button" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevButton />,
    nextArrow: <CustomNextButton />,
    afterChange: (currentSlide) => console.log(currentSlide),
  };

  const renderInstructionImages=()=>{

    return instructionImages.map((item, index)=>
    <div className="slider_item">
        <h2>{item.title}</h2>
        <img src={'/images/'+item.img+'.png'} alt={item.title} />
    </div>)

  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <Slider ref={(slider) => setSlider(slider)} {...settings}>
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
        </Slider>
        <button className="close-btn" onClick={onClose}>
        &times;
        </button>
      </div>
    </div>
  );
};

export default GuidePopup;
