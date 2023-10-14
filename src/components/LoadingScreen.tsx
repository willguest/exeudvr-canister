import React from 'react';
import styled, { keyframes } from 'styled-components';
import img from "./../assets/Build/unity_build.jpg";
import { Grid } from 'react-loading-icons';

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const StyledBanner = styled.div`
  position: absolute;
  width: 100%;
  background: #000000;
  font-size: 24px;
  color: white;
  text-align: center;
  align-items: center;
  animation: ${fadeInOut} ${(props: { duration: number }) => props.duration}s linear infinite;
`;

const StyledImage = styled.img`
  display: flex;
  width: 100%;
`;

interface LoadingScreenProps {
    progression: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progression }) => {
    const duration = 100 - progression;

    return (
        <StyledBanner duration={duration}>
            <StyledImage src={img} alt="island collective" />
            <p>
                <Grid height="1em" stroke="#b4a785" />
                Loading. Please wait...
                <Grid height="1em" stroke="#b4a785" />
            </p>
        </StyledBanner>
    );
};

export default LoadingScreen;
