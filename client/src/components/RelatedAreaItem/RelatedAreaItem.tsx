import styled from 'styled-components';

const RelatedAreaItemStyle = styled.div`
  width: 100%;
  height: 2.5rem;

  line-height: 2.5rem;

  font-size: 0.8rem;
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
  return <RelatedAreaItemStyle>{areaInfo.areaName}</RelatedAreaItemStyle>;
};

export default RelatedAreaItem;
