import styled from 'styled-components';
import React from 'react';
import { useAtom } from 'jotai';

import { BtnStyleTypes, FilterListBtnProps } from '../../types/interfaces';
import { enableStateAtom } from '../../atom/densityFilterBtn';

import { DISABLE_BUTTON_COLOR } from '../../config/constants';

const BtnStyle = styled.li<BtnStyleTypes>`
  display: block;
  width: 4rem;
  height: 1.5rem;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.3);
  background-color: ${props =>
    props.enable ? props.bgColor : DISABLE_BUTTON_COLOR.fill};
  border: 1px solid
    ${props => (props.enable ? props.borderColor : DISABLE_BUTTON_COLOR.stroke)};
  border-radius: 200px;
  font-size: 0.8rem;
  text-align: center;
  padding-top: 0.2rem;

  color: white;
  text-shadow: 1px 1px
    ${props => (props.enable ? props.borderColor : DISABLE_BUTTON_COLOR.fill)};

  cursor: pointer;
  user-select: none;

  &:active {
    background-color: ${props =>
      props.enable ? props.borderColor : DISABLE_BUTTON_COLOR.stroke};
  }
`;

const DensityFilterListBtn: React.FC<FilterListBtnProps> = ({
  bgColor,
  borderColor,
  contents
}: FilterListBtnProps) => {
  const [enableState, setEnableState] = useAtom(enableStateAtom);

  const toggleActivationHandler = () => {
    setEnableState(prev => {
      return { ...prev, [`${contents}`]: !enableState[`${contents}`] };
    });
  };

  return (
    <BtnStyle
      onClick={toggleActivationHandler}
      bgColor={bgColor}
      borderColor={borderColor}
      enable={enableState[`${contents}`]}>
      {contents}
    </BtnStyle>
  );
};

export default DensityFilterListBtn;
