import styled from 'styled-components';

import Map from '../components/Map';

const StyledMainPage = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainPage = () => {
  return (
    <StyledMainPage>
      <Map />
    </StyledMainPage>
  );
};

export default MainPage;
