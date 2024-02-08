import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

const imageURL = '/images/NewTargets.mind';

const ARScene = () => {
  const navigate = useNavigate();
  const sceneRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener('renderstart', () => {
      arSystem.start(); // start AR 
    });
    return () => {
      arSystem.stop();
    }
  }, [navigate]);

  useEffect(() => {
    if (!data) return;
    const sceneEl = sceneRef.current;
    const imageTargets = sceneEl.querySelectorAll('[mindar-image-target]');
    imageTargets.forEach((target, index) => {
      target.addEventListener('targetFound', () => {
        console.log('targetIndex:', index);
        navigate(`/marker/${index+1}`);
      });
    });
  }, [data, navigate]);

  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc: ${imageURL}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <img
          id="card"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png"
          alt="Card Example"
        />
        <a-asset-item
          id="avatarModel"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
        ></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      {data &&
        data.map((item, index) => (
          <a-entity key={index} mindar-image-target={`targetIndex: ${index}`}>
            <a-text value={item.dashboard_id} color="white" position="0 1 0"></a-text>
          </a-entity>
        ))}
    </a-scene>
  );
};

export default ARScene;
