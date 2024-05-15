import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CustomSlider from '../Elements/CustomSlider';
import FavIcon from '../Elements/FavIcon';
import RenderSlide from '../Elements/RenderSlide';

const MarkerSlider = ({ t }) => {
  const navigate = useNavigate();
  const { targetId } = useParams();
  const [targetData, setTargetData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [savedData, setSaveData] = useState(null)
  const [dataFromUrl, setDataFromUrl] = useState(null)
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const savedDataParam = queryParams.get('savedData');

    if (savedDataParam) {
      // Process savedDataParam here

      const savedDataArray = savedDataParam.split('+');
      const dataArray = savedDataArray.map(slideId => ({ markerID: targetId, slideIDs: slideId.split(' ').map(Number) }));

      setDataFromUrl(dataArray)

    }
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
  }, [targetId, useNavigate]);

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
    const queryParams = existingFav.map((item) => `${item.slideIDs.join('+')}`).join('+');
    const dataArray = queryParams.split('+').map(Number);
    navigate(`/marker/${targetId}?savedData=${queryParams}`);
  };

  const onClose = () => {
    navigate(`/`);
  }
  if (loader) {
    return <div className="marker-slider-container">
      <img className="guide-top" src="/images/top.png" alt="guide top" />
      <h1 className='loading-text'>{t('loading')}...</h1>
    </div>;
  }
  const dataToRender = savedData.length === 0 ? dataFromUrl : savedData

  return (
    <div className="marker-slider-container">

      <img className="guide-top" src="/images/top.png" alt="guide top" />
      <div className='header-saved'>

        {
          dataToRender?.filter(i => i.markerID === targetId)
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
                    <FavIcon id={index} targetId={targetId} toggleSave={toggleSave} dataFromUrl={dataFromUrl} />
                  </div>
                  <div className='slider-main-center-container'>
                    <RenderSlide src={item.mediaURL} />
                  </div>
                  <p className='slider-item-description'>{item.description}</p>
                </div>
              ))
            }
          </CustomSlider>
        )}
       
      </div>
      <button className="close-btn" onClick={onClose}>
          &times;
        </button>
    </div>
  );
};

export default MarkerSlider;
