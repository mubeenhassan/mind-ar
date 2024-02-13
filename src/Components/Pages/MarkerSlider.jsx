import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change navigate to useNavigate
import CustomSlider from '../Elements/CustomSlider';

const MarkerSlider = ({ t }) => {
  const navigate = useNavigate();

  const { targetId } = useParams();
  const [targetData, setTargetData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Find the object with the specified dashboard_id
        const targetItem = data.find(item => item.dashboard_id === Number(targetId));
        setLoader(false);
        setTargetData(targetItem);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [targetId, useNavigate]); // Change navigate to useNavigate

  useEffect(() => {
    // Load saved data from local storage on component mount
    const savedDataJSON = localStorage.getItem('savedData');
    if (savedDataJSON) {
      setSavedData(JSON.parse(savedDataJSON));
    }
  }, []);

  const toggleSave = () => {
    if (savedData && savedData[targetData.dashboard_id]) {
      const updatedSavedData = { ...savedData };
      delete updatedSavedData[targetData.dashboard_id];
      localStorage.setItem('savedData', JSON.stringify(updatedSavedData));
      setSavedData(updatedSavedData);
    } else {
      const updatedSavedData = {
        ...savedData,
        [targetData.dashboard_id]: targetData,
      };
      localStorage.setItem('savedData', JSON.stringify(updatedSavedData));
      setSavedData(updatedSavedData);
    }
  };
  console.log(savedData)
  const onClose = () => {
    navigate(`/`);
  }
  if (loader) {
    return <h1>{t('loading')}...</h1>;
  }

  return (
    <div className="marker-slider-container">
      <img className="guide-top" src="/images/guide-top.png" alt="guide top" />
      <div className="marker-slider">
        {targetData && (
          <CustomSlider>
            <div className="slider-item ">
              <div className='slider-item-title-container'>
                <div className='slider-btn-header' >
                  <div className='profile-img'>
                    <img src="/images/12.png" alt="" />
                  </div>
                  <div className="slider-item-title-text">
                    <h2>Title1</h2>
                    <p>Substitle1</p>
                  </div>
                </div>
                <div className='star-icon' onClick={toggleSave}>
                  {savedData && savedData[targetData.dashboard_id]
                    ? <img src='/images/icon/star.svg' />
                    : <img src='/images/icon/star_inactive.svg' />}
                </div>
              </div>
              <div className='slider-main-center-container'>
                <img src="/images/mockupslider.png" alt="" />
              </div>
              <p className='slider-item-description'>{targetData.textDescription}</p>
            </div>
            <div className="slider-item ">
              <div className='slider-item-title-container'>
                <div className='slider-btn-header' >
                  <div className='profile-img'>
                    <img src="/images/12.png" alt="" />
                  </div>
                  <div className="slider-item-title-text">
                    <h2>Title2</h2>
                    <p>Substitle2</p>
                  </div>
                </div>
                <div className='star-icon' onClick={toggleSave}>
                  {savedData && savedData[targetData.dashboard_id]
                    ? <img src='/images/icon/star.svg' />
                    : <img src='/images/icon/star_inactive.svg' />}
                </div>
              </div>
              <div className='slider-main-center-container'>
                <img src="/images/mockupslider.png" alt="" />
              </div>
              <p className='slider-item-description'>{targetData.textDescription}</p>
            </div>
            <div className="slider-item ">
              <div className='slider-item-title-container'>
                <div className='slider-btn-header' >
                  <div className='profile-img'>
                    <img src="/images/12.png" alt="" />
                  </div>
                  <div className="slider-item-title-text">
                    <h2>Title3</h2>
                    <p>Substitle3</p>
                  </div>
                </div>
                <div className='star-icon' onClick={toggleSave}>
                  {savedData && savedData[targetData.dashboard_id]
                    ? <img src='/images/icon/star.svg' />
                    : <img src='/images/icon/star_inactive.svg' />}
                </div>
              </div>
              <div className='slider-main-center-container'>
                <img src="/images/mockupslider.png" alt="" />
              </div>
              <p className='slider-item-description'>{targetData.textDescription}</p>
            </div>

            <div className="slider-item">
              {targetData.imageUrl.includes('.mp4') ? (
                <div className="slider-item">
                  <h2 className="slider-item-title">Video</h2>
                  <video controls className="slider-video">
                    <source src={targetData.imageUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="slider-item">
                  <h2 className="slider-item-title">Main Image</h2>
                  <img src={targetData.imageUrl} alt="marker" className="slider-image" />
                </div>
              )}
            </div>
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
