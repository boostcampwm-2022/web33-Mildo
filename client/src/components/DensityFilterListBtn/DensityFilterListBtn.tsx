import styled from 'styled-components';
import React, { useState } from 'react';

interface BtnStyleProps {
  bgColor: string;
  borderColor: string;
  disable: boolean;
}

interface FilterListBtnProps extends BtnStyleProps {
  contents: string;
}

const BtnStyle = styled.li<BtnStyleProps>`
  display: block;
  width: 4rem;
  height: 1.5rem;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.3);
  background-color: ${props => (!props.disable ? props.bgColor : '#BFBFBF')};
  border: 1px solid ${props => (!props.disable ? props.borderColor : '#999999')};
  border-radius: 200px;
  font-size: 0.8rem;
  text-align: center;
  padding-top: 0.2rem;

  color: white;
  text-shadow: 1px 1px
    ${props => (!props.disable ? props.borderColor : '#BFBFBF')};

  cursor: pointer;
  user-select: none;

  &:active {
    background-color: ${props =>
      !props.disable ? props.borderColor : '#999999'};
  }
`;

const DensityFilterListBtn: React.FC<FilterListBtnProps> = ({
  bgColor,
  borderColor,
  contents
}: FilterListBtnProps) => {
  const [isDeactivate, setIsDeactivate] = useState(false);

  const toggleActivationHandler = () => {
    setIsDeactivate(prev => !prev);
  };

  return (
    <BtnStyle
      onClick={toggleActivationHandler}
      bgColor={bgColor}
      borderColor={borderColor}
      disable={isDeactivate}>
      {contents}
    </BtnStyle>
  );
};

export default DensityFilterListBtn;
