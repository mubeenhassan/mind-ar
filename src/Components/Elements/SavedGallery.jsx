import React, { useState, useEffect, useRef } from "react";
import FavIcon from "./FavIcon";
import { useParams, useNavigate } from 'react-router-dom'; // Change navigate to useNavigate

const SavedGallery = () => {
    const videoRef = useRef(null);
    const { targetId } = useParams();

    const [dataToShow, setDataToShow] = useState(null);
    const [savedData, setSaveData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const filteredData = filterData(data);
                setDataToShow(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    const filterData = (data) => {
        const URL = window.location.pathname;
        const existingFav = JSON.parse(localStorage.getItem('savedDataNew')) ?? [];

        for (const item of data.slides) {
            if (`/marker/${item.markerID}` === URL) {
                const foundItem = existingFav.find(_item => `/marker/${_item.markerID}` === URL);
                if (foundItem) {
                    const filteredSlides = foundItem.slideIDs.map(slideIndex => item.slides[slideIndex]);
                    return filteredSlides;
                } else {
                    console.log("Item not found for markerID:", URL);
                    return null;
                }
            }
        }
        return null; // Return null if no matching item is found
    }

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


    return (
        <div className="popup-saved">
            {dataToShow?.map((items, key) => (<div className="saved-box">
            <div className='slider-item-title-container'>

            <div className='slider-btn-header' >
                      
                      <div className="slider-item-title-text">
                        <h2>{items.title}</h2>
                        <p>{items.subtitle}</p>
                      </div>
                    </div>
                <FavIcon id={key} targetId={targetId} toggleSave={toggleSave} />
                </div>
                <div className="media-box">
                    {items.mediaURL?.includes(".mp4") ?
                        <video
                            ref={videoRef}
                            controls={true}
                        >
                            <source src={items.mediaURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> : <img src="" />
                    }
                </div>
            </div>))}

        </div>
    );
};

export default SavedGallery;
