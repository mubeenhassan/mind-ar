import React, { useRef, useState } from 'react';

const RenderSlide = ({ src, savedData }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State for loader
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

    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    return (
        <div className='videoPlayerWraper'>
            {src === '' ? (
                <p className='noSourceFound'>
                    404 Source Not Found
                </p>
            ) : isNsaImage ? (
                <div className='mockup-saved'>
                    <img src="/images/mockupslider.png" />
                    <a href={src} target="_blank" rel="noopener noreferrer">Open NASA Worldview</a>
                </div>
            ) : isYoutube ? (
                <iframe className='yt-frame' width="560" height="315" src={src} frameBorder="0" allowFullScreen></iframe>
            ) : (
                <div className='video-container'>
                    {isLoading && <div className="loader" />}
                    <video
                        ref={videoRef}
                        controls={false}
                        onClick={togglePlay}
                        onMouseEnter={() => setIsPlaying(true)}
                        onMouseLeave={() => setIsPlaying(false)}
                        onLoadStart={handleLoadStart}
                        onCanPlay={handleCanPlay}
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                  {!isLoading &&  <div className='play-button' onClick={togglePlay}>
                        {isPlaying ? <img src="/images/icon/pause.png" alt="pause" /> : <img src="/images/icon/play.svg" alt="play" />}
                    </div>}
                </div>
            )}

            {(!isNsaImage && !isYoutube && savedData) && (
                <div className='play-button' onClick={togglePlay}>
                    {isPlaying ? <img src="/images/icon/pause.png" alt="pause" /> : <img src="/images/icon/play.svg" alt="play" />}
                </div>
            )}
        </div>
    );
};

export default RenderSlide;
