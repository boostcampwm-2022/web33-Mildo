import { memo } from 'react';
import { createPinSvg } from '../../utils/map.util';

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
}

const Marker: React.FC<MarkerProps> = ({ area, naverMap }) => {
  const a = () => {
    const [_, areaObject] = area;
    const { latitude, longitude, populationLevel } = areaObject;
    const marker = new naver.maps.Marker({
      map: naverMap,
      position: new naver.maps.LatLng(latitude, longitude),
      icon: {
        content: `<div>${createPinSvg(populationLevel)}</div>`,
        anchor: new naver.maps.Point(17.5, 50)
      }
    });

    naver.maps.Event.addListener(marker, 'click', (e: object) => {
      console.log(e);

      const location = new naver.maps.LatLng(
        marker.getPosition().y,
        marker.getPosition().x
      );

      naverMap.setCenter(location);
      naverMap.setZoom(16);
    });

    // markerObject.setIcon({
    //   content: `<div class="marker">${createBigPinSvg(markerLevel)}</div>`,
    //   size: new naver.maps.Size(35, 50),
    //   anchor: new naver.maps.Point(17.5, 50),
    //   origin: new naver.maps.Point(0, 0)
    // });
  };

  a();

  return <div></div>;
};

export default memo(Marker);
