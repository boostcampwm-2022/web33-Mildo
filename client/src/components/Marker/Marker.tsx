import { memo, useEffect } from 'react';
import { useUpdateAtom } from 'jotai/utils';

import { createPinSvg, setBigMarkerIcon } from '../../utils/map.util';
import { MarkerObjectTypes, SortAllAreasTypes } from '../../types/interfaces';
import {
  isInfoDetailModalOpenAtom,
  firstLevelInfoAtom,
  isSecondLevelAtom
} from '../../atom/infoDetail';

interface MarkerProps {
  area: SortAllAreasTypes;
  naverMap: naver.maps.Map;
  onClickMarker: (marker: MarkerObjectTypes, populationLevel: string) => void;
}

const Marker: React.FC<MarkerProps> = ({ area, naverMap, onClickMarker }) => {
  const setIsInfoDetailModalOpen = useUpdateAtom(isInfoDetailModalOpenAtom);
  const setFirstLevelInfo = useUpdateAtom(firstLevelInfoAtom);
  const setIsSecondLevel = useUpdateAtom(isSecondLevelAtom);
  const [, areaObject] = area;
  const { latitude, longitude, populationLevel } = areaObject;

  useEffect(() => {
    const marker = new naver.maps.Marker({
      map: naverMap,
      position: new naver.maps.LatLng(latitude, longitude),
      icon: {
        content: `<div>${createPinSvg(populationLevel)}</div>`,
        anchor: new naver.maps.Point(17.5, 50)
      }
    });

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
  }, []);

  return <></>;
};

export default memo(Marker);
