import styled from 'styled-components';

const LoadingPageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapLoading = () => {
  return (
    <LoadingPageStyle>
      <h1>로딩중입니다...</h1>
      <img src='https://ifh.cc/g/RQcSZX.gif' />
    </LoadingPageStyle>
  );
};

export default MapLoading;
