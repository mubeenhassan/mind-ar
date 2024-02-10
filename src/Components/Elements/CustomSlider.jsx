import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider = ({ children }) => {
  const [slider, setSlider] = useState(null);

  const CustomPrevButton = ({ onClick, children }) => (
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
  };

  return (
    <Slider ref={(slider) => setSlider(slider)} {...settings}>
      {children}
    </Slider>
  );
};

export default CustomSlider;
