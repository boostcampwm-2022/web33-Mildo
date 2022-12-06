import styled from 'styled-components';

const RelatedAreaItemStyle = styled.li`
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.8rem;
  padding-left: 10px;

  strong {
    color: #6349ff;
    font-size: 0.8rem;
  }

  :hover {
    cursor: pointer;
    background-color: #eeeeee;
    border-radius: 10px;
  }
`;

const EmptyAreaItemStyle = styled.li`
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 10px;
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
  searchAreaName: string;
  areaInfo: DataRelatedAreaInfoTypes;
}

const printSignatureColor = (searchAreaName: string, areaName: string) => {
  return areaName.replace(searchAreaName, `<strong>${searchAreaName}</strong>`);
};

const RelatedAreaItem: React.FC<RelatedSearchListProps> = ({
  searchAreaName,
  areaInfo
}) => {
  return (
    <>
      {areaInfo.coordinates.latitude === -1 ? (
        <EmptyAreaItemStyle>{areaInfo.areaName}</EmptyAreaItemStyle>
      ) : (
        <RelatedAreaItemStyle
          dangerouslySetInnerHTML={{
            __html: printSignatureColor(searchAreaName, areaInfo.areaName)
          }}
        />
      )}
    </>
  );
};

export default RelatedAreaItem;
