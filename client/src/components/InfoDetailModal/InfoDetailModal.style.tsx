import styled, { keyframes } from 'styled-components';
import { COLOR_PALETTE, POPULATION_LEVEL_COLOR } from '../../config/constants';

export const ModalLayout = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 35rem;
  height: auto;
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  transition: 0.2s all;
`;

// 북마크 on https://ifh.cc/v-6kHtyx.png
export const BookmarkIcon = styled.img`
  position: absolute;
  top: 0%;
  right: 7%;
`;

const marquee = keyframes`
0% {
  transform: translate(0%, 0);
}
50%{
  transform: translate(-10%, 0);
}
100% {
  transform: translate(0%, 0);
}
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  white-space: nowrap;
  will-change: transform;
  animation: ${marquee} 4s linear infinite;
`;

interface TitleLocationProps {
  populationLevel: string;
}

export const TitleLocation = styled.strong<TitleLocationProps>`
  font-size: 1.6rem;
  color: ${props => POPULATION_LEVEL_COLOR[props.populationLevel].fill};
`;

export const PopulationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  width: 100%;
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
