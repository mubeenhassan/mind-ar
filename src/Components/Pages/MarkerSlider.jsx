import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change navigate to useNavigate
import CustomSlider from '../Elements/CustomSlider';

const MarkerSlider = ({ t }) => {
  const navigate = useNavigate();

  const { targetId } = useParams();
  const [targetData, setTargetData] = useState(null);
  const [loader, setLoader] = useState(true);

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
        <div className='data-slider-bg' />
        <div className='slider-item-title-container'>
          <div className='profile-img'>
            <img src="/images/12.png" alt="" />
          </div>
          <div className="slider-item-title-text">
            <h2>Title</h2>
            <p>Substitle</p>
          </div>
        </div>
        <p className='slider-item-description'>{targetData.textDescription}</p>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {targetData && (
          <CustomSlider>
            <div className="slider-item ">
              <h3 className="slider-item-title">Dashboard ID: {targetData.dashboard_id}</h3>
            </div>
            <div className="slider-item">
              <ul className="slider-url-list">
                <h2 className="slider-item-title">List of URLs</h2>
                {targetData.urlList.map((url, idx) => (
                  <li key={idx}>
                    <a href={url}>{url}</a>
                  </li>
                ))}
              </ul>
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
      </div>
    </div>
  );
};

export default MarkerSlider;
