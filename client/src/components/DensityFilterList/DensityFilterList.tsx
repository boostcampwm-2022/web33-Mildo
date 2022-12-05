import styled from 'styled-components';
import DensityFilterListBtn from '../DensityFilterListBtn/DensityFilterListBtn';

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
  margin-top: 15px;

  position: absolute;
  top: 7%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const DensityFilterList = () => {
  return (
    <DensityFilterLayout>
      <DensityFilterListBtn
        bgColor='#FF1E1E'
        borderColor='#970000'
        contents='매우 붐빔'
      />
      <DensityFilterListBtn
        bgColor='#FF9900'
        borderColor='#BB7000'
        contents='붐빔'
      />
      <DensityFilterListBtn
        bgColor='#FFDB1D'
        borderColor='#B1A000'
        contents='보통'
      />
      <DensityFilterListBtn
        bgColor='#43EB40'
        borderColor='#12A50F'
        contents='여유'
      />
    </DensityFilterLayout>
  );
};

export default DensityFilterList;
