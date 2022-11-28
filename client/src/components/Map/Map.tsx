import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../apis/apis';
import { SEOUL_BOUNDS } from '../../config/constants';
import Marker from '../Marker/Marker';

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

type SortAllAreasTypes = [string, CoordinatesPopulationTypes];

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [areas, setAreas] = useState<SortAllAreasTypes[]>([]);

  // MapComponent DOM에 네이버 지도 렌더링
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
          SEOUL_BOUNDS.SW.LATITUDE,
          SEOUL_BOUNDS.SW.LONGITUDE
        ),
        new naver.maps.LatLng(
          SEOUL_BOUNDS.NE.LATITUDE,
          SEOUL_BOUNDS.NE.LONGITUDE
        )
      )
    };

    setNaverMap(new naver.maps.Map(mapRef.current, mapOptions));
  }, []);

  // DB에서 최근 장소 정보 가져오기
  useEffect(() => {
    if (!naverMap) {
      return;
    }

    const getAllArea = async () => {
      const { data: allAreas }: GetAllAreaResponseTypes =
        await api.getAllArea();

      const sortAllAreas = Object.entries(allAreas).sort(
        (prev, next) => next[1].latitude - prev[1].latitude
      );

      setAreas(sortAllAreas);
    };

    getAllArea();
  }, [naverMap]);

  return (
    <>
      <MapComponent ref={mapRef} />
      {areas &&
        naverMap &&
        areas.map((area: SortAllAreasTypes, index: number) => (
          <Marker area={area} naverMap={naverMap} key={index} />
        ))}
    </>
  );
};

export default Map;
