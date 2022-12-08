import styled from 'styled-components';
import { COLOR_PALETTE } from '../../config/constants';

export const SecondLevelBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-bottom: 0px;
  transition: 1s all;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TomorrowRanking = styled.div`
  width: 100%;
  height: 30%;
  background-color: ${COLOR_PALETTE.GREY20};
  border-radius: 10px;
  cursor: pointer;
`;
