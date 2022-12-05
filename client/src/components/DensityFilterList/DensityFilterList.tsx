import styled from 'styled-components';

const DensityFilterLayout = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  width: 92%;
  max-width: 500px;

  height: 2rem;
  background-color: orangered;

  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const DensityFilterList = () => {
  return <DensityFilterLayout></DensityFilterLayout>;
};

export default DensityFilterList;
