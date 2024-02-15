import React, { useRef, useState } from 'react';

const RenderSlide = ({ src }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isNsaImage, setIsNsaImage] = useState(src.includes('worldview.earthdata.nasa.gov'));

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
                <div>
                    <img src="" />

                </div>
            ) : (
                <div>
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
            <div className='play-button' onClick={togglePlay}>
                {isPlaying ? <img src="/images/icon/pause.png" alt="play" /> : <img src="/images/icon/play.svg" alt="play" />}
            </div>
        </div>
    );
};



export default RenderSlide;
