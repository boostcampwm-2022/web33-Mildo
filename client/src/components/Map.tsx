import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const MapComponent = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Map = () => {
  const mapRef = useRef(null);
  const [coordinates] = useState({
    latitude: 37.5656,
    longitude: 126.9769
  });

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

    (() => new naver.maps.Map(mapRef.current, mapOptions))();
  }, []);

  return <MapComponent ref={mapRef} />;
};

export default Map;
