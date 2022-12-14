import React from 'react';
import styled, { CSSProp, css } from 'styled-components';

interface MapLoadingProps {
  message?: string | null;
  width?: string;
  height?: string;
  customLoadingPageStyle?: CSSProp | CSSProp<{ isDisplay: boolean }>;
}

interface LoadingProps {
  customLoadingPageStyle?: CSSProp;
}

const defaultLoadingPageStyle = css`
  width: 100vw;
  height: 100vh;
`;

const LoadingPageStyle = styled.div<LoadingProps>`
  ${props => props.customLoadingPageStyle && props.customLoadingPageStyle}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapLoading: React.FC<MapLoadingProps> = ({
  message = '로딩중입니다...',
  width = '200px',
  height = '200px',
  customLoadingPageStyle = defaultLoadingPageStyle
}) => {
  return (
    <LoadingPageStyle customLoadingPageStyle={customLoadingPageStyle}>
      {message && <h1>{message}</h1>}
      <img
        src='assets/loading.gif'
        width={width}
        height={height}
        aria-label='로딩중입니다...'
      />
    </LoadingPageStyle>
  );
};

export default MapLoading;
