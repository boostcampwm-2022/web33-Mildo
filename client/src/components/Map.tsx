import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from 'react-hook-geolocation';

import fetchGeocodeFromCoords from '../apis/axios';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapRef = useRef(null);
  // 기본 좌표를 시청역으로 설정
  const defaultCoords = {
    latitude: 37.5656,
    longitude: 126.9769
  };

  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000
  });

  useEffect(() => {
    const { naver } = window;
    const location = new naver.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    );
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 16,
      minZoom: 13,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(37.47, 126.84),
        new naver.maps.LatLng(37.65, 127.2)
      )
    };

    if (!mapRef.current || !naver) return;

    // 위도, 경도가 있는 경우 네이버 API에 주소 요청
    if (geolocation.latitude && geolocation.longitude) {
      fetchGeocodeFromCoords(geolocation.latitude, geolocation.longitude).then(
        result => {
          // 서울인 경우 -> 해당 위치를 결과 값으로 리턴
          // 서울이 아닌 경우 -> 서울 중심 위치를 결과값으로 리턴
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
    }

    // MapComponent DOM에 네이버 지도 렌더링
    (() => new naver.maps.Map(mapRef.current, mapOptions))();
  }, [geolocation]);

  return <MapComponent ref={mapRef} />;
};

export default Map;
