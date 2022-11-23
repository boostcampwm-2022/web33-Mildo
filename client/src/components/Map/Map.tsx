import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapComponentPropsType } from '../../types/interfaces';
import api from '../../apis/apis';
import { createPinSvg } from '../../utils/map.util';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

interface CoordinatesTypes {
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populationTime: Date;
  latitude: number;
  longitude: number;
}

interface GetAllAreaResponseTypes {
  ok: boolean;
  data: CoordinatesTypes;
}

const Map: React.FC<MapComponentPropsType> = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  // const [areaMarkers, setAreaMarkers] = useState<naver.maps.Marker[]>([]);

  useEffect(() => {
    const { naver } = window;

    if (!mapRef.current || !naver) {
      return;
    }

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 16,
      minZoom: 12,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(37.47, 126.84),
        new naver.maps.LatLng(37.65, 127.2)
      )
    };

    // MapComponent DOM에 네이버 지도 렌더링
    setMap(new naver.maps.Map(mapRef.current, mapOptions));
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    const getAllArea = async () => {
      const { data: allArea }: GetAllAreaResponseTypes = await api.getAllArea();

      console.log(allArea);

      Object.entries(allArea).forEach(
        ([_, value]: [string, CoordinatesTypes]) => {
          (() =>
            new naver.maps.Marker({
              map,
              position: new naver.maps.LatLng(value.latitude, value.longitude),
              icon: {
                content: `<div class="marker">${createPinSvg(
                  value.populationLevel
                )}</div>`,
                size: new naver.maps.Size(35, 50),
                anchor: new naver.maps.Point(17.5, 50),
                origin: new naver.maps.Point(0, 0)
              }
            }))();
        }
      );
    };

    getAllArea();
  }, [map]);

  return <MapComponent ref={mapRef} />;
};

export default Map;
