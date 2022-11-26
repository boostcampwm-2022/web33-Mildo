import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';

import Map from '../../components/Map/Map';
import MapLoading from '../../components/MapLoading/MapLoading';
import fetchGeocodeFromCoords from '../../apis/axios';
import InfoDetailModal from '../../components/InfoDetailModal/InfoDetailModal';
import {
  DEFAULT_COORDINATES,
  GEOLOCATION_CONSTANTS,
  USERS_LOACTION
} from '../../config/constants';
import axios from 'axios';

const StyledMainPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

interface CoordinatesTypes {
  latitude: number;
  longitude: number;
}

const MainPage = () => {
  const [coordinates, setCoordinates] = useState<CoordinatesTypes>({
    latitude: 0,
    longitude: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: GEOLOCATION_CONSTANTS.maximumAge,
    timeout: GEOLOCATION_CONSTANTS.timeout
  });

  useEffect(() => {
    // 위도, 경도가 있는 경우 네이버 API에 주소 요청
    if (geolocation.latitude && geolocation.longitude) {
      fetchGeocodeFromCoords(geolocation.latitude, geolocation.longitude).then(
        result => {
          // 서울인 경우 -> 해당 위치를 결과 값으로 리턴
          // 서울이 아닌 경우 -> 서울 중심 위치를 결과값으로 리턴
          setIsLoading(false);
          if (
            result === USERS_LOACTION.SEOUL ||
            result === USERS_LOACTION.GWACHEON
          ) {
            setCoordinates({
              latitude: geolocation.latitude,
              longitude: geolocation.longitude
            });
          }
          if (result !== USERS_LOACTION.SEOUL) {
            setCoordinates({ ...DEFAULT_COORDINATES });
          }
        }
      );
    } else {
      setIsLoading(false);
      setCoordinates({ ...DEFAULT_COORDINATES });
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
      <InfoDetailModal />
    </StyledMainPage>
  );
};

export default MainPage;
