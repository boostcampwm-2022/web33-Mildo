import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../apis/apis';
import { createBigPinSvg, createPinSvg } from '../../utils/map.util';
import { MARKER_CLASS_NAME, SEOUL_BOUNDS } from '../../config/constants';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

interface CoordinatesPopulationTypes {
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populationTime: Date;
  latitude: number;
  longitude: number;
}

interface GetAllAreaResponseTypes {
  ok: boolean;
  data: CoordinatesPopulationTypes;
}

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  // const currentClickMarkerRef = useRef<naver.maps.Marker>(null);
  // const focusMarkersRef = useRef<naver.maps.InfoWindow[]>([]);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const { naver } = window;

    if (!mapRef.current || !naver) {
      return;
    }

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 14,
      minZoom: 12,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(
          SEOUL_BOUNDS.sw.latitude,
          SEOUL_BOUNDS.sw.longitude
        ),
        new naver.maps.LatLng(
          SEOUL_BOUNDS.ne.latitude,
          SEOUL_BOUNDS.ne.longitude
        )
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

      markersRef.current = Object.entries(allArea)
        .sort((prev, next) => {
          // 위도순으로 오름차순 정렬
          return next[1].latitude - prev[1].latitude;
        })
        .map(
          (
            [
              areaName,
              {
                latitude: areaLatitude,
                longitude: areaLongitude,
                populationLevel: areaPopulationLevel
              }
            ]: [string, CoordinatesPopulationTypes],
            index: number
          ) => {
            return new naver.maps.Marker({
              map,
              position: new naver.maps.LatLng(areaLatitude, areaLongitude),
              icon: {
                content: `<div class="${MARKER_CLASS_NAME}" data-area="${areaName}" data-latitude="${areaLatitude}" data-longitude="${areaLongitude}" data-index="${index}" data-level="${areaPopulationLevel}">${createPinSvg(
                  areaPopulationLevel
                )}</div>`,
                anchor: new naver.maps.Point(17.5, 50)
              }
            });
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
    map.setZoom(16);

    const markerIndex = +marker.dataset.index!;
    const markerLevel = marker.dataset.level!;
    const markerObject: naver.maps.Marker = markersRef.current[markerIndex];

    const { content } = markerObject.getIcon() as { content: string };

    console.log(content);

    // focusMarkerRef.current! = new naver.maps.InfoWindow({
    //   content: `<div class="marker">${createBigPinSvg(markerLevel)}</div>`,
    //   pixelOffset: new naver.maps.Point(17.5, 50)
    // });

    // if (focusMarkerRef.current?.getMap()) {
    //   focusMarkerRef.current.close();
    // } else {
    //   focusMarkerRef.current.open(map, markerObject);
    // }

    markerObject.setIcon({
      content: `<div class="marker">${createBigPinSvg(markerLevel)}</div>`,
      size: new naver.maps.Size(35, 50),
      anchor: new naver.maps.Point(17.5, 50),
      origin: new naver.maps.Point(0, 0)
    });
  };

  return <MapComponent ref={mapRef} onTouchEnd={mapTouchEndHandler} />;
};

export default Map;
