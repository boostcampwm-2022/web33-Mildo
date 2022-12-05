import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RelatedAreaItem from '../RelatedAreaItem/RelatedAreaItem';

const RelatedAreaListStyle = styled.div`
  z-index: 0;
  width: 100%;
  max-width: 439px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 3.5rem;
  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  padding-left: 10px;
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
  areaName: '검색 결과가 주요 50곳에 포함되지 않습니다.',
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

  useEffect(() => {
    setIsEmptyRelatedList(
      searchAreaName !== '' && Object.keys(relatedAreaInfo).length === 0
    );
  }, [relatedAreaInfo]);

  return (
    <RelatedAreaListStyle>
      {isEmptyRelatedList ? (
        <RelatedAreaItem
          searchAreaName={searchAreaName}
          areaInfo={emptyAreaInfo}
        />
      ) : (
        Object.keys(relatedAreaInfo).map((areaName, index) => {
          const areaInfo = {
            areaName,
            coordinates: relatedAreaInfo[areaName]
          };

          return (
            <RelatedAreaItem
              key={index}
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
