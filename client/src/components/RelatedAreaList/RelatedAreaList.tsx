import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CAN_NOT_FIND_SEARCH_AREA } from '../../config/constants';
import RelatedAreaItem from '../RelatedAreaItem/RelatedAreaItem';

const RelatedAreaListStyle = styled.ul`
  width: 100%;
  max-width: 439px;
  max-height: 20rem;
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

interface RelatedSearchListProps {
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

const RelatedSearchList: React.FC<RelatedSearchListProps> = ({
  searchAreaName,
  relatedAreaInfo
}) => {
  const [isEmptyRelatedList, setIsEmptyRelatedList] = useState(true);

  const onClickRelatedAreaList: React.MouseEventHandler<
    HTMLUListElement
  > = e => {
    console.log(e.target);
  };

  useEffect(() => {
    setIsEmptyRelatedList(
      searchAreaName !== '' && Object.keys(relatedAreaInfo).length === 0
    );
  }, [relatedAreaInfo]);

  return (
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
  );
};

export default RelatedSearchList;
