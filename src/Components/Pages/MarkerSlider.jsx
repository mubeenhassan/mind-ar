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
        data.slides.map((item, index) => {
          if (item.markerID === targetId) {
            // console.log(item.slides)
            setLoader(false);
            setTargetData(item.slides);
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [targetId, useNavigate]); // Change navigate to useNavigate
  useEffect(() => {
    // Load saved data from local storage on component mount
    const savedDataJSON = localStorage.getItem('savedDataNew');
    if (savedDataJSON) {
      setSavedData(JSON.parse(savedDataJSON));
    }
  }, []);

  const toggleSave = (dashboardId) => {
    // if (!savedData) {
    //   const initialSavedData = {};
    //   initialSavedData[dashboardId] = true;
    //   setSavedData(initialSavedData);
    //   localStorage.setItem('savedDataNew', JSON.stringify(initialSavedData));
    // } else {
    //   const updatedSavedData = { ...savedData };
    //   if (updatedSavedData[dashboardId]) {
    //     delete updatedSavedData[dashboardId];
    //   } else {
    //     updatedSavedData[dashboardId] = true;
    //   }
    //   setSavedData(updatedSavedData);
    //   localStorage.setItem('savedDataNew', JSON.stringify(updatedSavedData));
    // }
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
                    <div className='star-icon' onClick={toggleSave(item)}>
                      {savedData && savedData[targetData.dashboard_id]
                        ? <img src='/images/icon/star.svg' />
                        : <img src='/images/icon/star_inactive.svg' />}
                    </div>
                  </div>
                  <div className='slider-main-center-container'>
                    <video controls className="slider-video">
                    <source src={item.mediaURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                    {/* <img src='https://worldview.earthdata.nasa.gov/?v=-180,-87.5,180,92.5&df=true&kiosk=true&eic=si&l=IMERG_Precipitation_Rate,Land_Mask&lg=false&t=2023-10-30-T16%3A00%3A00Z' /> */}
                    {/* <iframe src="https://worldview.earthdata.nasa.gov/?v=-180,-87.5,180,92.5&df=true&kiosk=true&eic=si&l=IMERG_Precipitation_Rate,Land_Mask&lg=false&t=2023-10-30-T16%3A00%3A00Z" role="application" sandbox="allow-modals allow-scripts allow-same-origin allow-forms allow-popups" width="100%" height="100%" allow="fullscreen; autoplay;" loading="lazy"></iframe> */}

                  </div>
                  <p className='slider-item-description'>{item.description}</p>
                </div>
              ))
            }

            {/* <div className="slider-item ">
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
            </div> */}
            {/* <div className="slider-item ">
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
            </div> */}

            {/* <div className="slider-item">
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
            </div> */}
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
