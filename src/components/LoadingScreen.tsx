import React, { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import img from "./../assets/Build/unity_build.jpg";

// palette: 
// https://coolors.co/702781-bc227a-1ea8e1-f28e31-000000
const colorChange = keyframes`
  0% { background: #702781; }
  25% { background: #bc227a; }
  50% { background: #1ea8e1; }
  75% { background: #f28e31; }
  100% { background: #000000; }
`;

const StyledBanner = styled.div<{ duration: number, progression: number }>`
  position: absolute;
  width: ${(props) => props.progression}%;
  height: 24px;
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
  overflow: "hidden";
`;

interface LoadingScreenProps {
    progression: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progression }) => {
    const duration = 5;
    return (
      <Fragment>    
        <StyledBanner 
          duration={duration} 
          progression={progression}/>
        <StyledImage src={img} alt="island collective"/>
        </Fragment>
    );
};

export default LoadingScreen;