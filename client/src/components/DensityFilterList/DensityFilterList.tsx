import styled from 'styled-components';
import DensityFilterListBtn from '../DensityFilterListBtn/DensityFilterListBtn';
import { POPULATION_LEVEL_COLOR, Z_INDEX } from '../../config/constants';

const DensityFilterLayout = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 5px;

  width: 92%;
  max-width: 500px;
  height: 2rem;
  margin-left: 2px;
  margin-top: 30px;

  position: absolute;
  top: 7%;
  left: 50%;
  transform: translate(-50%, 0%);

  z-index: ${Z_INDEX.DENSITY_FILTER_BUTTON};
`;

const DensityFilterList = () => {
  return (
    <DensityFilterLayout>
      <DensityFilterListBtn
        bgColor={POPULATION_LEVEL_COLOR['매우 붐빔'].fill}
        borderColor={POPULATION_LEVEL_COLOR['매우 붐빔'].stroke}
        contents='매우 붐빔'
      />
      <DensityFilterListBtn
        bgColor={POPULATION_LEVEL_COLOR['붐빔'].fill}
        borderColor={POPULATION_LEVEL_COLOR['붐빔'].stroke}
        contents='붐빔'
      />
      <DensityFilterListBtn
        bgColor={POPULATION_LEVEL_COLOR['보통'].fill}
        borderColor={POPULATION_LEVEL_COLOR['보통'].stroke}
        contents='보통'
      />
      <DensityFilterListBtn
        bgColor={POPULATION_LEVEL_COLOR['여유'].fill}
        borderColor={POPULATION_LEVEL_COLOR['여유'].stroke}
        contents='여유'
      />
    </DensityFilterLayout>
  );
};

export default DensityFilterList;
