import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';

import Map from '../../components/Map/Map';
import MapLoading from '../../components/MapLoading/MapLoading';
// import fetchGeocodeFromCoords from '../../apis/axios';
import InfoDetailModal from '../../components/InfoDetailModal/InfoDetailModal';
import {
  DEFAULT_COORDINATES,
  GEOLOCATION_CONSTANTS,
  USERS_LOACTION
} from '../../config/constants';
import apis from '../../apis/apis';

const StyledMainPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

interface CoordinatesTypes {
  latitude: number;
  longitude: number;
}

interface UsersLocationResponseTypes {
  results: { region: { area1: { name: string } } }[];
  status: {
    code: number;
    message: string;
    name: string;
  };
}

const MainPage = () => {
  const [coordinates, setCoordinates] = useState<CoordinatesTypes>({
    latitude: 0,
    longitude: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: GEOLOCATION_CONSTANTS.MAXIMUMAGE,
    timeout: GEOLOCATION_CONSTANTS.TIMEOUT
  });

  const isUserInSeoulOrGwaCheon = (usersLocation: string) => {
    return (
      usersLocation === USERS_LOACTION.SEOUL ||
      usersLocation === USERS_LOACTION.GWACHEON
    );
  };

  const setMapCenter = async () => {
    if (!geolocation.latitude || !geolocation.longitude) {
      setIsLoading(false);
      setCoordinates({ ...DEFAULT_COORDINATES });
      return;
    }
    // 위도, 경도가 있는 경우 네이버 API에 주소 요청
    const usersLocationResponse: UsersLocationResponseTypes =
      await apis.getUsersLocation(geolocation.latitude, geolocation.longitude);

    setIsLoading(false);
    if (!usersLocationResponse.results) {
      return;
    }
    const userLocation = usersLocationResponse.results[0].region.area1.name;

    if (isUserInSeoulOrGwaCheon(userLocation)) {
      setCoordinates({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude
      });
      return;
    }
    setCoordinates({ ...DEFAULT_COORDINATES });
  };

  useEffect(() => {
    setMapCenter();
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
