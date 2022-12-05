import { useUpdateAtom } from 'jotai/utils';
import { MarkerObjectTypes, SortAllAreasTypes } from '../types/interfaces';

import {
  createPinSvg,
  setBigMarkerIcon,
  setMarkerIcon
} from '../utils/map.util';
import {
  isInfoDetailModalOpenAtom,
  firstLevelInfoAtom,
  isSecondLevelAtom
} from '../atom/infoDetail';
import { markerArray } from '../atom/markerArray';

interface PrevPlaceTypes {
  marker: MarkerObjectTypes;
  populationLevel: string;
}

const useMarker = (
  naverMap: naver.maps.Map | null,
  prevPlace: React.MutableRefObject<PrevPlaceTypes | null>
) => {
  const setIsInfoDetailModalOpen = useUpdateAtom(isInfoDetailModalOpenAtom);
  const setFirstLevelInfo = useUpdateAtom(firstLevelInfoAtom);
  const setIsSecondLevel = useUpdateAtom(isSecondLevelAtom);
  const setMarkerStorage = useUpdateAtom(markerArray);

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

  const makeMarker = (
    area: SortAllAreasTypes
    // onClickMarker: (marker: MarkerObjectTypes, populationLevel: string) => void
  ) => {
    if (!naverMap) {
      return;
    }
    const [, areaObject] = area;
    const { latitude, longitude, populationLevel } = areaObject;

    const marker = new naver.maps.Marker({
      map: naverMap,
      position: new naver.maps.LatLng(latitude, longitude),
      icon: {
        content: `<div>${createPinSvg(populationLevel)}</div>`,
        anchor: new naver.maps.Point(17.5, 50)
      }
    });

    setMarkerStorage(prev => [...prev, marker]);

    naver.maps.Event.addListener(marker, 'click', () => {
      const location = new naver.maps.LatLng(
        marker.getPosition().y,
        marker.getPosition().x
      );

      naverMap.setCenter(location);
      naverMap.setZoom(16);

      // 현재 마커를 이전 마커로 등록
      onClickMarker(marker, populationLevel);

      setBigMarkerIcon(marker, populationLevel);

      // infoDetailModal 열고 닫기
      setIsInfoDetailModalOpen(true);
      setFirstLevelInfo(area);

      // 2단계 상세정보 모달 닫기
      setIsSecondLevel(false);
    });
  };

  return [makeMarker];
};

export default useMarker;
