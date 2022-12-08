import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUpdateAtom } from 'jotai/utils';
import { useAtom, useAtomValue } from 'jotai';

import { MarkerObjectTypes, SortAllAreasTypes } from '../../types/interfaces';
import { SEOUL_BOUNDS } from '../../config/constants';
import { setMarkerIcon } from '../../utils/map.util';
import {
  isInfoDetailModalOpenAtom,
  isSecondLevelAtom
} from '../../atom/infoDetail';
import useMarker from '../../hooks/useMarker';
import { markerArray } from '../../atom/markerArray';
import { enableStateAtom } from '../../atom/densityFilterBtn';
import { allAreasInfoAtom } from '../../atom/areasInfo';
import { isRelatedAreaListOpenAtom } from '../../atom/relatedAreaList';

const MapComponent = styled.div`
  width: 100%;
  height: 100%;
`;

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
  const [areas] = useAtom(allAreasInfoAtom);
  const prevPlace = useRef<PrevPlaceTypes | null>(null);
  const setIsInfoDetailModalOpen = useUpdateAtom(isInfoDetailModalOpenAtom);
  const setIsRelatedAreaListOpen = useUpdateAtom(isRelatedAreaListOpenAtom);
  const setIsSecondLevel = useUpdateAtom(isSecondLevelAtom);
  const [markerStorage, setMarkerStorage] = useAtom(markerArray);
  const enableState = useAtomValue(enableStateAtom);

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
      minZoom: SEOUL_BOUNDS.MIN_ZOOM,
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
    if (!mapRef.current || !naver) {
      return;
    }

    const location = new naver.maps.LatLng(latitude, longitude);

    setIsInfoDetailModalOpen(false);
    prevPlace.current = null;
    naverMap?.setCenter(location);
  }, [latitude, longitude]);

  useEffect(() => {
    if (!areas || !naverMap) {
      return;
    }

    markerStorage.forEach(el => el.setMap(null));
    setMarkerStorage([]);
    areas
      .filter((area: SortAllAreasTypes) => enableState[area[1].populationLevel])
      .map((area: SortAllAreasTypes) => makeMarker(area));
  }, [areas, enableState, naverMap]);

  // 마커 이외의 영역을 클릭하면 1단계, 2단계 모달창이 닫힘
  const onClickMap = () => {
    setIsRelatedAreaListOpen(false);
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
