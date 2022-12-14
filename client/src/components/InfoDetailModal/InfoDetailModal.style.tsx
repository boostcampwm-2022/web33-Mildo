import styled, { css, keyframes } from 'styled-components';
import { TitleTypes } from '../../types/interfaces';
import {
  COLOR_PALETTE,
  POPULATION_LEVEL_COLOR,
  Z_INDEX
} from '../../config/constants';

export const ModalLayout = styled.div`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100vw;
  max-width: 35rem;
  height: auto;
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  transition: 0.2s all;
  overflow-x: hidden;
  z-index: ${Z_INDEX.FILTER};
`;

export const BookmarkIcon = styled.img`
  position: absolute;
  top: 0%;
  right: 7%;
  cursor: pointer;
`;

const marquee = (width: number) => keyframes`
/* 0% {
  -ms-transform: translate(${width}px);
  -webkit-transform: translate(${width}px);
  -moz-transform: translate(${width}px);
  -o-transform: translate(${width}px);
  transform: translate(${width}px); 
} */
100% {
  -ms-transform: translate(-${width}px);
  -webkit-transform: translate(-${width}px);
  -moz-transform: translate(-${width}px);
  -o-transform: translate(-${width}px);
  transform: translate(-${width}px);
} 
`;

export const Title = styled.h1`
  display: inline-block;
  text-align: center;
  font-size: 1rem;
  white-space: nowrap;
  will-change: transform;
`;

export const TitleBox = styled.div<TitleTypes>`
  display: flex;
  flex-direction: row;
  transform: translate(${props => (props.slide ? 50 : 0)}%);
  justify-content: ${props => (props.slide ? 'normal' : 'center')};
  gap: 50%;
  width: 100%;
  animation: ${props =>
    props.slide
      ? css`
          ${marquee(props.textWidth)} 10s linear infinite
        `
      : ''};
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

export const TimeLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${COLOR_PALETTE.PRIMARY};
  line-height: 1.5;
`;

export const PopulationInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  padding-top: 7px;

  > div {
    display: flex;
    justify-content: space-between;
  }

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
