import { memo, useEffect } from 'react';
import { useAtom } from 'jotai';

import { createPinSvg, setBigMarkerIcon } from '../../utils/map.util';
import { MarkerObjectTypes } from '../../types/interfaces';
import isInfoDetailModalOpenAtom from '../../atom/infoDetail';

interface CoordinatesPopulationTypes {
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populationTime: Date;
  latitude: number;
  longitude: number;
}

type SortAllAreasTypes = [string, CoordinatesPopulationTypes];

interface MarkerProps {
  area: SortAllAreasTypes;
  naverMap: naver.maps.Map;
  onClickMarker: (marker: MarkerObjectTypes, populationLevel: string) => void;
}

const Marker: React.FC<MarkerProps> = ({ area, naverMap, onClickMarker }) => {
  const [, setIsInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
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
    });
  }, [naverMap]);

  return <div></div>;
};

export default memo(Marker);
