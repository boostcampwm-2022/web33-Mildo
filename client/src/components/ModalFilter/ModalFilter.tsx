import styled from 'styled-components';
import { SetStateAction } from 'react';

import { Z_INDEX } from '../../config/constants';

const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${Z_INDEX.FILTER};
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
`;

interface ModalFilterProps {
  isClickModalFilter: (update: SetStateAction<boolean>) => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({ isClickModalFilter }) => {
  return <Filter onClick={() => isClickModalFilter(false)}></Filter>;
};

export default ModalFilter;
