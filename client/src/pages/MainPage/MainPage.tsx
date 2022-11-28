import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';
import MapLoading from '../../components/MapLoading/MapLoading';
// import fetchGeocodeFromCoords from '../../apis/axios';
import InfoDetailModal from '../../components/InfoDetailModal/InfoDetailModal';
import { DEFAULT_COORDINATES, USERS_LOCATION } from '../../config/constants';
import apis from '../../apis/apis';

// GEOLOCATION_CONSTANTS

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
  const [coordinates, setCoordinates] = useState<CoordinatesTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const geolocation = useGeolocation({
  //   enableHighAccuracy: true,
  //   maximumAge: GEOLOCATION_CONSTANTS.MAXIMUMAGE,
  //   timeout: GEOLOCATION_CONSTANTS.TIMEOUT
  // });

  const isUserInSeoulOrGwaCheon = (usersLocation: string) => {
    return (
      usersLocation === USERS_LOCATION.SEOUL ||
      usersLocation === USERS_LOCATION.GWACHEON
    );
  };

  const setMapCenter = async (latitude: number, longitude: number) => {
    // 위도, 경도가 있는 경우 네이버 API에 주소 요청
    const usersLocationResponse: UsersLocationResponseTypes =
      await apis.getUsersLocation(latitude, longitude);

    if (!usersLocationResponse.results) {
      return;
    }
    const userLocation = usersLocationResponse.results[0].region.area1.name;

    if (isUserInSeoulOrGwaCheon(userLocation)) {
      setCoordinates({ latitude, longitude });
      return;
    }
    setCoordinates({ ...DEFAULT_COORDINATES });
  };

  useEffect(() => {
    // 사용자 위치 정보 알아내기
    const success = (geolocationPosition: GeolocationPosition) => {
      // 위도/경도 : geolocationPosition.coords.longitude, geolocationPosition.coords.latitude,
      console.log('위치 정보 허용: ', geolocationPosition);
      setMapCenter(
        geolocationPosition.coords.latitude,
        geolocationPosition.coords.longitude
      );
    };

    const error = (value: GeolocationPositionError) => {
      console.log('위치 정보 거부');
      console.log(value.code, value.message);
      setCoordinates({ ...DEFAULT_COORDINATES });
    };

    navigator.geolocation.watchPosition(success, error);
  }, []);

  useEffect(() => {
    if (!coordinates) {
      return;
    }
    // 서울 중심 여부 혹은 사용자 위치 정보 허용 여부에 따라 다른 초기 위치 랜더링
    console.log(coordinates);
    setIsLoading(false);
  }, [coordinates]);

  return (
    <StyledMainPage>
      {isLoading ? (
        <MapLoading />
      ) : (
        <Map
          latitude={coordinates!.latitude}
          longitude={coordinates!.longitude}
        />
      )}
      <InfoDetailModal />
    </StyledMainPage>
  );
};

export default MainPage;
