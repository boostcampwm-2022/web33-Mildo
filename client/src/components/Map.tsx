import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MapComponentPropsType } from '../types/interfaces';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = ({ latitude, longitude }: MapComponentPropsType) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { naver } = window;

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 16,
      minZoom: 13,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(37.47, 126.84),
        new naver.maps.LatLng(37.65, 127.2)
      )
    };

    if (!mapRef.current || !naver) {
      return;
    }

    // MapComponent DOM에 네이버 지도 렌더링
    (() => new naver.maps.Map(mapRef.current, mapOptions))();
  }, []);

  return <MapComponent ref={mapRef} />;
};

export default Map;
