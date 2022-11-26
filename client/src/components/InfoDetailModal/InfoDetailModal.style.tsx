import styled from 'styled-components';
import { COLOR_PALETTE } from '../../config/constants';

// 북마크 on https://ifh.cc/v-6kHtyx.png
export const BookmarkIcon = styled.img`
  position: absolute;
  top: 0%;
  right: 7%;
`;

export const Title = styled.h3`
  font-size: 1rem;
`;

export const TitleLocation = styled.strong`
  font-size: 1.6rem;
  color: ${COLOR_PALETTE.GREEN};
`;

export const PopulationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 30%;
  gap: 20px;
  background-color: ${COLOR_PALETTE.GREY20};
  border-radius: 10px;
`;

export const PopulationInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  padding-top: 7px;

  p:first-child {
    font-size: 1rem;
    font-weight: 700;
  }

  p:last-child {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export const TomorrowButton = styled.button`
  width: 90%;
  height: 2.5rem;

  background-color: ${COLOR_PALETTE.PRIMARY};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;

  padding-top: 4px;
`;

export const SecondLevelBox = styled.div<{ isDisplay: boolean }>`
  width: 90%;
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
`;

export const TomorrowRanking = styled.div`
  width: 100%;
  height: 30%;
  background-color: ${COLOR_PALETTE.GREY20};
  border-radius: 10px;
`;
