import React, { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import img from "./../assets/Build/unity_build.jpg";
import { Grid } from 'react-loading-icons';

// palette
// https://coolors.co/702781-bc227a-1ea8e1-f28e31-000000
const colorChange = keyframes`
  0% { background: #702781; color: #000000; }
  25% { background: #bc227a; color: #f28e31; }
  50% { background: #1ea8e1; color: #1ea8e1; }
  75% { background: #f28e31; color: #bc227a; }
  100% { background: #000000; color: #702781; }
`;

const StyledBanner = styled.div<{ duration: number }>`
  position: absolute;
  width: 100%;
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

interface LoadingScreenProps {
    progression: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progression }) => {
    const duration = 10;
    const backgroundColor = '#702781'; 
    const colour = '#000000';

    return (
      <Fragment>    
        <StyledImage src={img} alt="island collective" 
          style={{ width: "100%", overflow: "hidden"}}/>
        <StyledBanner duration={duration} 
          background={backgroundColor} color={colour}>
            <p>
                <Grid height="1em" stroke="#b4a785" />
                Loading. Please wait...
                <Grid height="1em" stroke="#b4a785" />
            </p>
        </StyledBanner>
        </Fragment>
    );
};

export default LoadingScreen;