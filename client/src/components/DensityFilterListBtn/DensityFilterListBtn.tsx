import styled from 'styled-components';
import React from 'react';

interface BtnStyleProps {
  bgColor: string;
  borderColor: string;
}

interface FilterListBtnProps extends BtnStyleProps {
  contents: string;
}

const BtnStyle = styled.li<BtnStyleProps>`
  display: block;
  width: 4rem;
  height: 1.5rem;
  background-color: ${props => props.bgColor || 'blue'};
  border: 1px solid ${props => props.borderColor || 'white'};
  border-radius: 200px;
  font-size: 0.75rem;
  text-align: center;
  padding-top: 2px;

  color: white;
  text-shadow: 1px 1px ${props => props.borderColor || 'black'};
`;

const DensityFilterListBtn: React.FC<FilterListBtnProps> = ({
  bgColor,
  borderColor,
  contents
}: FilterListBtnProps) => {
  return (
    <BtnStyle bgColor={bgColor} borderColor={borderColor}>
      {contents}
    </BtnStyle>
  );
};

export default DensityFilterListBtn;
