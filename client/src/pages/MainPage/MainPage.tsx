import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useEffect } from 'react';

import { userInfoAtom } from '../../atom/userInfo';
import apis from '../../apis/apis';
import Map from '../../components/Map/Map';
import { DEFAULT_COORDINATES, USERS_LOCATION } from '../../config/constants';
import { isLoginModalOpenAtom } from '../../atom/loginModal';
import SearchBarAndMyBtn from '../../components/SearchBarAndMyBtn/SearchBarAndMyBtn';
import DensityFilterList from '../../components/DensityFilterList/DensityFilterList';
import InfoDetailModal from '../../components/InfoDetailModal/InfoDetailModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import MyInfoSideBar from '../../components/MyInfoSideBar/MyInfoSideBar';

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

const isUserInSeoulOrGwaCheon = (usersLocation: string) => {
  return (
    usersLocation === USERS_LOCATION.SEOUL ||
    usersLocation === USERS_LOCATION.GWACHEON
  );
};

const MainPage = () => {
  const userInfo = useAtomValue(userInfoAtom);
  const setIsLoginModalOpen = useUpdateAtom(isLoginModalOpenAtom);

  const { data: coordinates } = useQuery<CoordinatesTypes>(
    'key',
    (): Promise<CoordinatesTypes> => {
      return new Promise((resolve, reject) => {
        const success = async (geolocationPosition: GeolocationPosition) => {
          const latitude = geolocationPosition.coords.latitude;
          const longitude = geolocationPosition.coords.longitude;
          const usersLocationResponse: UsersLocationResponseTypes =
            await apis.getUsersLocation(latitude, longitude);
          const userLocation =
            usersLocationResponse.results[0].region.area1.name;

          if (!usersLocationResponse.results) {
            resolve(DEFAULT_COORDINATES);
          }

          if (isUserInSeoulOrGwaCheon(userLocation)) {
            resolve({ latitude, longitude });
          }
          resolve(DEFAULT_COORDINATES);
        };

        const error = () => {
          reject(DEFAULT_COORDINATES);
        };

        navigator.geolocation.getCurrentPosition(success, error);
      });
    },
    {
      suspense: true
    }
  );

  useEffect(() => {
    if (userInfo.data.isLoggedIn) {
      setIsLoginModalOpen(false);
    }
  }, []);

  return (
    <StyledMainPage>
      <Map
        latitude={coordinates!.latitude}
        longitude={coordinates!.longitude}
      />
      <SearchBarAndMyBtn />
      <DensityFilterList />
      <InfoDetailModal />
      <LoginModal />
      <MyInfoSideBar />
    </StyledMainPage>
  );
};

export default MainPage;
