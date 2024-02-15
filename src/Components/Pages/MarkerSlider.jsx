import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change navigate to useNavigate
import CustomSlider from '../Elements/CustomSlider';
import FavIcon from '../Elements/FavIcon';
import RenderSlide from '../Elements/RenderSlide';
const MarkerSlider = ({ t }) => {
  const navigate = useNavigate();

  const { targetId } = useParams();
  const [targetData, setTargetData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [savedData, setSaveData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        data.slides.map((item, index) => {
          if (item.markerID === targetId) {
            setLoader(false);
            setTargetData(item.slides);
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    let existingFav = JSON.parse(localStorage.getItem('savedDataNew')) ?? [];
    setSaveData(existingFav)
    fetchData();
  }, [targetId, useNavigate]); // Change navigate to useNavigate

  const toggleSave = (index) => {
    let existingFav = JSON.parse(localStorage.getItem('savedDataNew')) ?? [];
    setSaveData(existingFav)
    const existingIndex = existingFav.findIndex(item => item.markerID === targetId);

    if (existingIndex !== -1) {
      if (existingFav[existingIndex].slideIDs.includes(index)) {
        existingFav[existingIndex].slideIDs = existingFav[existingIndex].slideIDs.filter(id => id !== index);
        if (existingFav[existingIndex].slideIDs.length === 0) {
          existingFav.splice(existingIndex, 1);
        }
      } else {
        existingFav[existingIndex].slideIDs.push(index);
      }
    } else {
      existingFav.push({
        markerID: targetId,
        slideIDs: [index]
      });
    }

    localStorage.setItem('savedDataNew', JSON.stringify(existingFav));
  };


  const onClose = () => {
    navigate(`/`);
  }
  if (loader) {
    return <h1>{t('loading')}...</h1>;
  }
  return (
    <div className="marker-slider-container">
      <img className="guide-top" src="/images/guide-top.png" alt="guide top" />
      <div className='header-saved'>
        {
          savedData
            .filter(i => i.markerID === targetId)
            .flatMap(i => i.slideIDs.map(d => (
              <div key={d} className='saved-item'>
                <img src={`/images/placeholder/${d}.svg`} alt="placeholder" />
              </div>
            )))
        }
      </div>
      <div className="marker-slider">
        {targetData && (
          <CustomSlider>
            {
              targetData.map((item, index) => (
                <div key={index} className="slider-item ">
                  {/* {console.log(item)} */}
                  <div className='slider-item-title-container'>
                    <div className='slider-btn-header' >
                      <div className='profile-img'>
                        <img src="/images/12.png" alt="" />
                      </div>
                      <div className="slider-item-title-text">
                        <h2>{item.title}</h2>
                        <p>{item.subtitle}</p>
                      </div>
                    </div>
                    <FavIcon id={index} targetId={targetId} toggleSave={toggleSave} />
                  </div>
                  <div className='slider-main-center-container'>
                    <RenderSlide src={item.mediaURL} />
                    {/* <img src='https://worldview.earthdata.nasa.gov/?v=-180,-87.5,180,92.5&df=true&kiosk=true&eic=si&l=IMERG_Precipitation_Rate,Land_Mask&lg=false&t=2023-10-30-T16%3A00%3A00Z' /> */}
                    {/* <iframe src="https://worldview.earthdata.nasa.gov/?v=-180,-87.5,180,92.5&df=true&kiosk=true&eic=si&l=IMERG_Precipitation_Rate,Land_Mask&lg=false&t=2023-10-30-T16%3A00%3A00Z" role="application" sandbox="allow-modals allow-scripts allow-same-origin allow-forms allow-popups" width="100%" height="100%" allow="fullscreen; autoplay;" loading="lazy"></iframe> */}
                  </div>
                  <p className='slider-item-description'>{item.description}</p>
                </div>
              ))
            }
          </CustomSlider>
        )}
      
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default MarkerSlider;
