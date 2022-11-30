import React from 'react';
import styled from 'styled-components';

interface MapLoadingProps {
  message?: string | null;
  width?: string;
  height?: string;
}

const LoadingPageStyle = styled.div<MapLoadingProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapLoading: React.FC<MapLoadingProps> = ({
  message = '로딩중입니다...',
  width = '200px',
  height = '200px'
}) => {
  return (
    <LoadingPageStyle>
      {message && <h1>{message}</h1>}
      <img src='https://ifh.cc/g/RQcSZX.gif' width={width} height={height} />
    </LoadingPageStyle>
  );
};

export default MapLoading;
