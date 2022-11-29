import styled from 'styled-components';

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

const ModalFilter = () => {
  return <Filter></Filter>;
};

export default ModalFilter;
