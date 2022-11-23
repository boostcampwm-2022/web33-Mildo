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

      Object.entries(allArea)
        .sort((prev, next) => {
          // 위도순으로 오름차순 정렬
          return next[1].latitude - prev[1].latitude;
        })
        .forEach(
          ([
            areaName,
            {
              latitude: areaLatitude,
              longitude: areaLongitude,
              populationLevel: areaPopulationLevel
            }
          ]: [string, CoordinatesTypes]) => {
            (() =>
              new naver.maps.Marker({
                map,
                position: new naver.maps.LatLng(areaLatitude, areaLongitude),
                icon: {
                  content: `<div class="marker" data-area="${areaName}" data-latitude="${areaLatitude}" data-longitude="${areaLongitude}">${createPinSvg(
                    areaPopulationLevel
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

  const mapTouchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const marker = (e.target as HTMLDivElement).closest(
      '.marker'
    ) as HTMLDivElement;

    if (!marker || !map) {
      return;
    }

    const location = new naver.maps.LatLng(
      +marker.dataset.latitude!,
      +marker.dataset.longitude!
    );

    map.setCenter(location);

    console.log(marker);
  };

  return <MapComponent ref={mapRef} onTouchEnd={mapTouchEndHandler} />;
};

export default Map;
