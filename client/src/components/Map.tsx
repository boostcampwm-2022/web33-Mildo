import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from 'react-hook-geolocation';
import axios from 'axios';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  });
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000
  });

  const defaultCoords = {
    latitude: 37.5656,
    longitude: 126.9769
  };

  useEffect(() => {
    const { naver } = window;
    const location = new naver.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    );
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17
    };

    if (!mapRef.current || !naver) return;

    const fetchCoordsDataFromAPI = async () => {
      // appid의 값은 나중에 환경변수로 따로 빼내야 한다.
      const apiURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${geolocation.latitude}&lon=${geolocation.longitude}&limit=5&appid=7bb7527a2dbfc2c2bf671f2bc4dc5fc1`;
      const responseData = await axios.get(apiURL);
      const cityData = await responseData.data[0]?.local_names.en;

      // 'Osan-si', 'Seoul'
      if (cityData && cityData !== 'Seoul') {
        setCoordinates(defaultCoords);
      }
      if (cityData && cityData === 'Seoul') {
        setCoordinates({
          latitude: geolocation.latitude,
          longitude: geolocation.longitude
        });
      }
    };

    if (geolocation.latitude && geolocation.longitude) {
      fetchCoordsDataFromAPI();
    }

    (() => new naver.maps.Map(mapRef.current, mapOptions))();
  }, [geolocation]);

  return <MapComponent ref={mapRef} />;
};

export default Map;
