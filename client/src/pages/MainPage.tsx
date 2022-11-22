import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';

import Map from '../components/Map';
import MapLoading from '../components/MapLoading';
import fetchGeocodeFromCoords from '../apis/axios';

const StyledMainPage = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainPage = () => {
  // 기본 좌표를 시청역으로 설정
  const defaultCoords = {
    latitude: 37.5656,
    longitude: 126.9769
  };

  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000
  });

  useEffect(() => {
    // 위도, 경도가 있는 경우 네이버 API에 주소 요청
    if (geolocation.latitude && geolocation.longitude) {
      fetchGeocodeFromCoords(geolocation.latitude, geolocation.longitude).then(
        result => {
          // 서울인 경우 -> 해당 위치를 결과 값으로 리턴
          // 서울이 아닌 경우 -> 서울 중심 위치를 결과값으로 리턴
          setIsLoading(false);
          if (result === '서울특별시' || result === '과천시') {
            setCoordinates({
              latitude: geolocation.latitude,
              longitude: geolocation.longitude
            });
          }
          if (result !== '서울특별시') {
            setCoordinates({ ...defaultCoords });
          }
        }
      );
    } else {
      setIsLoading(false);
      setCoordinates({ ...defaultCoords });
    }
  }, [geolocation]);

  return (
    <StyledMainPage>
      {isLoading ? (
        <MapLoading />
      ) : (
        <Map
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
      )}
    </StyledMainPage>
  );
};

export default MainPage;
