import styled from 'styled-components';

const RelatedAreaItemStyle = styled.div`
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.8rem;
`;

const EmptyItemStyle = styled.div`
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.8rem;
  color: #979797;
`;

interface CoordinatesTypes {
  latitude: number;
  longitude: number;
}

interface DataRelatedAreaInfoTypes {
  areaName: string;
  coordinates: CoordinatesTypes;
}

interface RelatedSearchListProps {
  areaInfo: DataRelatedAreaInfoTypes;
}

const RelatedAreaItem: React.FC<RelatedSearchListProps> = ({ areaInfo }) => {
  return (
    <>
      {areaInfo.coordinates.latitude === -1 ? (
        <EmptyItemStyle>{areaInfo.areaName}</EmptyItemStyle>
      ) : (
        <RelatedAreaItemStyle>{areaInfo.areaName}</RelatedAreaItemStyle>
      )}
    </>
  );
};

export default RelatedAreaItem;
