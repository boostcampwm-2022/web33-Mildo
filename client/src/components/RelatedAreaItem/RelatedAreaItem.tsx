import styled from 'styled-components';
import { COLOR_PALETTE } from '../../config/constants';

const RelatedAreaItemStyle = styled.li`
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.8rem;
  padding-left: 10px;

  strong {
    color: ${COLOR_PALETTE.PRIMARY};
    font-size: 0.8rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${COLOR_PALETTE.GREY20};
    border-radius: 10px;
  }
`;

const EmptyAreaItemStyle = styled.li`
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 10px;
  font-size: 0.8rem;
  color: ${COLOR_PALETTE.GREY};
`;

interface PartialMatchAreaItemProps {
  searchName: string;
  areaName: string;
}

const PartialMatchAreaItem: React.FC<PartialMatchAreaItemProps> = ({
  searchName,
  areaName
}) => {
  return (
    <>
      {areaName
        .replaceAll(searchName, `<>${searchName}<>`)
        .split('<>')
        .map(name => {
          if (name === searchName) return <strong>{searchName}</strong>;
          return <>{name}</>;
        })}
    </>
  );
};

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

const RelatedAreaItem: React.FC<RelatedSearchListProps> = ({
  searchAreaName,
  areaInfo
}) => {
  return (
    <>
      {areaInfo.coordinates.latitude === -1 ? (
        <EmptyAreaItemStyle>{areaInfo.areaName}</EmptyAreaItemStyle>
      ) : (
        <RelatedAreaItemStyle data-name={areaInfo.areaName}>
          <PartialMatchAreaItem
            searchName={searchAreaName}
            areaName={areaInfo.areaName}
          />
        </RelatedAreaItemStyle>
      )}
    </>
  );
};

export default RelatedAreaItem;
