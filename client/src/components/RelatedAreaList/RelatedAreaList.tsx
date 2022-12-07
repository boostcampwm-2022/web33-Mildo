import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isRelatedAreaListOpenAtom } from '../../atom/relatedAreaList';
import { CAN_NOT_FIND_SEARCH_AREA } from '../../config/constants';
import RelatedAreaItem from '../RelatedAreaItem/RelatedAreaItem';
import { markerArray } from '../../atom/markerArray';

const RelatedAreaListStyle = styled.ul`
  width: 100%;
  max-width: 439px;
  max-height: 15rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 3.5rem;
  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  list-style: none;
`;

interface CoordinatesTypes {
  latitude: number;
  longitude: number;
}

interface DataRelatedAreaInfoTypes {
  [areaName: string]: CoordinatesTypes;
}

interface RelatedAreaListProps {
  searchAreaName: string;
  relatedAreaInfo: DataRelatedAreaInfoTypes;
}

const emptyAreaInfo = {
  areaName: CAN_NOT_FIND_SEARCH_AREA,
  coordinates: {
    latitude: -1,
    longitude: -1
  }
};

const RelatedAreaList: React.FC<RelatedAreaListProps> = ({
  searchAreaName,
  relatedAreaInfo
}) => {
  const isRelatedAreaListOpen = useAtomValue(isRelatedAreaListOpenAtom);

  const [isEmptyRelatedList, setIsEmptyRelatedList] = useState(true);
  const markers = useAtomValue(markerArray);

  const onClickRelatedAreaList: React.MouseEventHandler<
    HTMLUListElement
  > = e => {
    if (!(e.target instanceof HTMLLIElement)) {
      return;
    }

    if (!e.target.dataset.name) {
      return;
    }

    const { latitude, longitude } = relatedAreaInfo[e.target.dataset.name];

    const marker = markers.find(
      item =>
        item.getPosition().x === longitude && item.getPosition().y === latitude
    );

    if (!marker) {
      return;
    }

    marker.trigger('click');
  };

  useEffect(() => {
    setIsEmptyRelatedList(
      searchAreaName !== '' && Object.keys(relatedAreaInfo).length === 0
    );
  }, [relatedAreaInfo]);

  return (
    <>
      {isRelatedAreaListOpen && (
        <RelatedAreaListStyle onClick={onClickRelatedAreaList}>
          {isEmptyRelatedList ? (
            <RelatedAreaItem
              searchAreaName={searchAreaName}
              areaInfo={emptyAreaInfo}
            />
          ) : (
            Object.keys(relatedAreaInfo).map(areaName => {
              const areaInfo = {
                areaName,
                coordinates: relatedAreaInfo[areaName]
              };

              return (
                <RelatedAreaItem
                  key={areaName}
                  searchAreaName={searchAreaName}
                  areaInfo={areaInfo}
                />
              );
            })
          )}
        </RelatedAreaListStyle>
      )}
    </>
  );
};

export default RelatedAreaList;
