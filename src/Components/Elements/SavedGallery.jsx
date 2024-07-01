import React, { useState, useEffect, useRef } from "react";
import FavIcon from "./FavIcon";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import RenderSlide from "./RenderSlide";

const SavedGallery = ({ t }) => {
    
    const [initialData, setinitialData] = useState(null)
    const [dataToShow, setDataToShow] = useState(null);
    const [savedData, setSaveData] = useState(null)
    const [dataFromUrl, setDataFromUrl] = useState(null)
    const location = useLocation();



    const [targetId, setTargetId] = useState(null)
    // console.log(parseInt(useLocation().pathname.split("/marker/")[1]))
    // setTargetId(urlTargetId)



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

    useEffect(() => {
        const urlTargetId= parseInt(location.pathname.split("/marker/")[1])
        const queryParams = new URLSearchParams(location.search);
        const savedDataParam = queryParams.get('savedData');

        if (savedDataParam) {
            const savedDataArray = savedDataParam.split('+');
            const dataArray = savedDataArray.map(slideId => ({ markerID: urlTargetId, slideIDs: slideId.split(' ').map(Number) }));
            setDataFromUrl(dataArray)
        }    

        fetchData();
    }, []);
    useEffect(()=>{

        fetchData();
    },[dataFromUrl])

    const filterData = (data) => {
    const URL = window.location.pathname;
    const existingFav = (dataFromUrl || JSON.parse(localStorage.getItem('savedDataNew'))) ?? [];
    setinitialData(existingFav);

    for (const item of data.slides) {
        if (`/marker/${item.markerID}` === URL) {
            const foundItem = existingFav.find(_item => `/marker/${_item.markerID}` === URL);

            if (foundItem) {
                setTargetId(foundItem.markerID);
                const filteredSlides = foundItem.slideIDs.map(slideIndex => {
                    return { ...item.slides[slideIndex], itemIndex: slideIndex }
                });

                // Remove duplicates from slideIDs
                const uniqueSlideIDs = Array.from(new Set(foundItem.slideIDs));

                return uniqueSlideIDs.map(slideIndex => {
                    return { ...item.slides[slideIndex], itemIndex: slideIndex }
                });
            } else {
                console.log("Item not found for markerID:", URL);
                return null;
            }
        }
    }
    return null;
}

    

    const toggleSave = (index) => {
        let existingFav = [...initialData]
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
        setinitialData(existingFav);
    };
    const handleSave = () => {
        localStorage.setItem('savedDataNew', JSON.stringify(initialData));
        const queryParams = initialData.map(item => `${item.slideIDs.join('+')}`);
        window.history.pushState({}, '', `/marker/${targetId}?savedData=${queryParams}`);
        window.location.reload(); // Reload the application
       
    }


    return (
        <>
            <button className="confirm-btn" onClick={handleSave}>{t('confirm')}</button>
            <div className="popup-saved">
                {dataToShow?.map((items, key) => (<div className="saved-box">
                    <div className='slider-item-title-container'>
                        <div className='slider-btn-header' >
                            <div className="slider-item-title-text">
                                <h2>{items.title}</h2>
                                <p>{items.subtitle}</p>
                            </div>
                        </div>
                        {/* {    console.log(initialData)
} */}
                        <FavIcon key={key} id={items.itemIndex} targetId={targetId} initialData={initialData} toggleSave={toggleSave} />
                    </div>
                    <div className="media-box">
                        <RenderSlide src={items.mediaURL} savedData />
                    </div>
                </div>))}
            </div>
        </>
    );
};

export default SavedGallery;
