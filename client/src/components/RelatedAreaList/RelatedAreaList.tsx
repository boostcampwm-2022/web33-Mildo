import { useEffect } from 'react';
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

const RelatedSearchList: React.FC<RelatedSearchListProps> = ({
  searchAreaName,
  relatedAreaInfo
}) => {
  useEffect(() => {
    console.log(searchAreaName);
    console.log(relatedAreaInfo);
  }, [relatedAreaInfo]);

  return (
    <RelatedAreaListStyle>
      {Object.keys(relatedAreaInfo).map(areaName => {
        const areaInfo = {
          areaName,
          coordinates: relatedAreaInfo[areaName]
        };

        return <RelatedAreaItem areaInfo={areaInfo}></RelatedAreaItem>;
      })}
    </RelatedAreaListStyle>
  );
};

export default RelatedSearchList;
