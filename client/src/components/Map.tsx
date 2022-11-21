import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from 'react-hook-geolocation';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapRef = useRef(null);

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000
  });

  const [coordinates, useCoordinates] = useState({
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

    if (geolocation.latitude && geolocation.longitude) {
      useCoordinates({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude
      });
    }

    (() => new naver.maps.Map(mapRef.current, mapOptions))();
  }, [geolocation]);

  return <MapComponent ref={mapRef} />;
};

export default Map;
