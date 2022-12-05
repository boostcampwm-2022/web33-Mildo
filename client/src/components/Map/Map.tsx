import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUpdateAtom } from 'jotai/utils';

import { MarkerObjectTypes } from '../../types/interfaces';
import api from '../../apis/apis';
import { SEOUL_BOUNDS } from '../../config/constants';
import { setMarkerIcon } from '../../utils/map.util';
import {
  isInfoDetailModalOpenAtom,
  isSecondLevelAtom
} from '../../atom/infoDetail';
import useMarker from '../../hooks/useMarker';

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
  const setIsInfoDetailModalOpen = useUpdateAtom(isInfoDetailModalOpenAtom);
  const setIsSecondLevel = useUpdateAtom(isSecondLevelAtom);
  const [makeMarker] = useMarker(naverMap, prevPlace);

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

  useEffect(() => {
    if (!areas || !naverMap) {
      return;
    }

    areas.map((area: SortAllAreasTypes) => makeMarker(area));
  }, [areas]);

  // 마커 이외의 영역을 클릭하면 1단계, 2단계 모달창이 닫힘
  const onClickMap = () => {
    if (!prevPlace.current) {
      return;
    }
    setIsInfoDetailModalOpen(false);
    setMarkerIcon(prevPlace.current.marker, prevPlace.current.populationLevel);
    prevPlace.current = null;
    setIsSecondLevel(false);
  };

  return (
    <>
      <MapComponent ref={mapRef} onClick={onClickMap} />
    </>
  );
};

export default Map;
