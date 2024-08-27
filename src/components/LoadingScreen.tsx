import React, { Fragment, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import img from "./../assets/Build/unity_build.jpg";
//import UnityBuildSize from "../../dist/unity/UnityBuildSize.json";

// palette:  
// https://coolors.co/702781-bc227a-1ea8e1-f28e31-000000
const colorChange = keyframes` 
  0% { background: #702781; }
  25% { background: #bc227a; }
  50% { background: #1ea8e1; }
  75% { background: #f28e31; }
  100% { background: #000000; }
`;

const StyledBanner = styled.div<{ duration: number, progress: number }>`
  position: absolute;
  width: ${props => props.progress}%;
  height: 18px;
  background: #702781;
  font-size: 24px;
  color: #000000;
  text-align: center;
  align-items: center;
  animation: ${colorChange} ${(props) => props.duration}s linear infinite;
`;

const StyledImage = styled.img`
  display: flex;
  width: 100%;
`;

const startTime = Date.now();

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(5); 

  // Read file size - to be updated once proper testing is done...
  //const totalSize = parseInt(UnityBuildSize['unity_build.data']) + parseInt(UnityBuildSize['unity_build.wasm']);
  const loadSize = (Math.round((35000000 / 1048576) * 100) / 100);

  // Guess download speed, in MB/s
  // TODO: detect internet speed
  const downloadSpeed = 1.5;
  
  useEffect(() => { 

        // Calculate estimated loading time in seconds
        const estimatedLoadingTime = (Math.round((loadSize / downloadSpeed) * 100) / 100);

        // Simulate progress
        
        let progTick = Date.now();

        const progressInterval = setInterval(() => {
          // rate limiter
          if (Date.now() - progTick < 150){
            return;
          }
          progTick = Date.now();
          const elapsedTime = (Date.now() - startTime) / 1000;

          setProgress(() => {
            const newProgression = (elapsedTime / estimatedLoadingTime) * 100;

            if (newProgression >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return Math.round(newProgression);
          });

        }, 300);
      }, [progress])
  
    return (
      <Fragment>    
        <StyledBanner 
          duration={duration} 
          progress={progress}/>
        <StyledImage src={img} alt="ExeuδVR"/>
        </Fragment>
    );
};

export default LoadingScreen;