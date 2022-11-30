import styled from 'styled-components';
import { COLOR_PALETTE } from '../../config/constants';

export const SecondLevelBox = styled.div<{ isDisplay: boolean }>`
  width: 100%;
  height: ${props => (props.isDisplay ? '10rem' : '0px')};
  transition: 1s all;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TraceGraph = styled.div`
  width: 100%;
  height: 70%;
  background-color: ${COLOR_PALETTE.GREY20};
  border-radius: 10px;
  overflow: auto;
`;

export const TomorrowRanking = styled.div`
  width: 100%;
  height: 30%;
  background-color: ${COLOR_PALETTE.GREY20};
  border-radius: 10px;
`;
