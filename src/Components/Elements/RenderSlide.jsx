import React, { useRef, useState } from 'react';

const RenderSlide = ({ src, savedData }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isNsaImage, setIsNsaImage] = useState(src.includes('worldview.earthdata.nasa.gov'));
    const [isYoutube, setIsYoutube] = useState(src.includes('www.youtube.com'));

    const togglePlay = () => {
        const video = videoRef.current;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className='videoPlayerWraper'>
            {isNsaImage ? (
                <div className='mockup-saved'>
                    <img src="/images/mockupslider.png" />
                </div>
            ) : isYoutube ? (<iframe className='yt-frame' width="560" height="315" src={src} frameborder="0" allowfullscreen></iframe>
            ) : (
                <div className='video-conainer'>
                    <video
                        ref={videoRef}
                        controls={false}
                        onClick={togglePlay}
                        onMouseEnter={() => setIsPlaying(true)}
                        onMouseLeave={() => setIsPlaying(false)}
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className='play-button' onClick={togglePlay}>
                        {isPlaying ? <img src="/images/icon/pause.png" alt="play" /> : <img src="/images/icon/play.svg" alt="play" />}
                    </div>
                </div>
            )}
            {!isNsaImage || !isYoutube || savedData && <div className='play-button' onClick={togglePlay}>
                {isPlaying ? <img src="/images/icon/pause.png" alt="play" /> : <img src="/images/icon/play.svg" alt="play" />}
            </div>}
        </div>
    );
};



export default RenderSlide;
