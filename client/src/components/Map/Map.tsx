import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MarkerObjectTypes } from '../../types/interfaces';
import api from '../../apis/apis';
import { SEOUL_BOUNDS } from '../../config/constants';
import Marker from '../Marker/Marker';
import { setMarkerIcon } from '../../utils/map.util';

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

interface PrevPlaceTypes {
  marker: MarkerObjectTypes;
  populationLevel: string;
}

const Map: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [areas, setAreas] = useState<SortAllAreasTypes[]>([]);
  const prevPlace = useRef<PrevPlaceTypes | null>(null);

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

  // 이전 마커를 작은 크기로 만들고, 새로운 마커를 이전 마커로 등록
  const onClickMarker = (
    marker: MarkerObjectTypes,
    populationLevel: string
  ) => {
    if (!prevPlace.current || !marker._nmarker_id) {
      setMarkerIcon(marker, populationLevel);

      prevPlace.current = {
        marker,
        populationLevel
      };
      return;
    }

    const { _nmarker_id: newMarkerId } = marker;
    const { _nmarker_id: oldMarkerId } = prevPlace.current.marker;

    if (newMarkerId === oldMarkerId) {
      return;
    }

    setMarkerIcon(prevPlace.current.marker, prevPlace.current.populationLevel);

    prevPlace.current = {
      marker,
      populationLevel
    };
  };

  return (
    <>
      <MapComponent ref={mapRef} />
      {areas &&
        naverMap &&
        areas.map((area: SortAllAreasTypes, index: number) => (
          <Marker
            area={area}
            naverMap={naverMap}
            key={index}
            onClickMarker={onClickMarker}
          />
        ))}
    </>
  );
};

export default Map;
