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
  const [savedData, setSaveData] = useState([]);
  const [dataFromUrl, setDataFromUrl] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const slides = data.slides.find(item => item.markerID === targetId);
        if (slides) {
          setLoader(false);
          setTargetData(slides.slides);
        } else {
          console.log("Marker data not found:", targetId);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const queryParams = new URLSearchParams(location.search);
    const savedDataParam = queryParams.get('savedData');
    if (savedDataParam) {
      const uniqueSlides = [...new Set(savedDataParam.split('+'))];
      const dataArray = uniqueSlides.map(slideId => ({ markerID: targetId, slideIDs: slideId.split(' ').map(Number) }));
      setDataFromUrl(dataArray);
    }

    fetchData();
  }, [targetId, location.search]);

  useEffect(() => {
    const existingFav = JSON.parse(localStorage.getItem('savedDataNew')) || [];
    setSaveData(existingFav);
  }, []);

  const toggleSave = (index) => {
    // Ensure we only update savedData[0]
    let existingFav = savedData.length > 0 ? [...savedData] : [];
  
    // Find the first item in savedData array (if it exists)
    const existingIndex = existingFav.length > 0 ? 0 : -1;
  
    if (existingIndex !== -1) {
      // If item exists, update the slideIDs array
      const slideIndex = existingFav[existingIndex].slideIDs.indexOf(index);
      if (slideIndex !== -1) {
        // Slide index already exists, remove it
        existingFav[existingIndex].slideIDs.splice(slideIndex, 1);
      } else {
        // Slide index does not exist, add it
        existingFav[existingIndex].slideIDs.push(index);
      }
    } else {
      // If item does not exist, add a new entry
      existingFav.push({
        markerID: targetId,
        slideIDs: [index]
      });
    }
  
    // Ensure uniqueness of slide IDs within the first item in existingFav
    if (existingFav.length > 0) {
      existingFav[0].slideIDs = [...new Set(existingFav[0].slideIDs)];
    }
  
    // Create queryParams with unique slide IDs
    const queryParamsSet = new Set();
    existingFav.forEach(item => {
      item.slideIDs.forEach(id => queryParamsSet.add(id));
    });
    const queryParams = Array.from(queryParamsSet).join('+');
  
    // Update savedData with the modified existingFav
    setSaveData(existingFav);
  
    // Update localStorage with the JSON stringified existingFav
    localStorage.setItem('savedDataNew', JSON.stringify(existingFav));
  
    // Navigate to the updated URL with the unique queryParams
    navigate(`/marker/${targetId}?savedData=${queryParams}`);
  };
  
  
  const onClose = () => {
    navigate('/');
  };

  if (loader) {
    return (
      <div className="marker-slider-container">
        <img className="guide-top" src="/images/top.png" alt="guide top" />
        <h1 className='loading-text'>{t('loading')}...</h1>
      </div>
    );
  }

  return (
    <div className="marker-slider-container">
      <img className="guide-top" src="/images/top.png" alt="guide top" />
      <div className='header-saved'>
      {console.log(savedData)}
        {savedData
          .filter(item => item.markerID == targetId)
          .flatMap(item => item.slideIDs.map(slideId => (
            <div key={slideId} className='saved-item'>
              <img src={`/images/placeholder/${slideId}.svg`} alt="placeholder" />
            </div>
          )))
        }
      </div>
      <div className="marker-slider">
        {targetData && (
          <CustomSlider>
            {targetData.map((item, index) => (
              <div key={index} className="slider-item">
                <div className='slider-item-title-container'>
                  <div className='slider-btn-header'>
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
            ))}
          </CustomSlider>
        )}
      </div>
      <button className="close-btn" onClick={onClose}>&times;</button>
    </div>
  );
};

export default MarkerSlider;
