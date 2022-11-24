import styled from 'styled-components';
import { useState } from 'react';

const ModalLayout = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
  width: 100%;
  max-width: 35rem;
  height: auto;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  transition: 0.2s all;
`;

// 북마크 on https://ifh.cc/v-6kHtyx.png
const BookmarkIcon = styled.img`
  position: absolute;
  top: 0%;
  right: 7%;
`;

const Title = styled.h3`
  font-size: 1rem;
`;

const TitleLocation = styled.strong`
  font-size: 1.6rem;
  color: #43eb40;
`;

const PopulationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 30%;
  gap: 20px;
  background-color: #eeeeee;
  border-radius: 10px;
`;

const PopulationInfo = styled.div`
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

const TomorrowButton = styled.button`
  width: 90%;
  height: 2.5rem;

  background-color: #6349ff;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;

  padding-top: 4px;
`;

const SecondLevelBox = styled.div<{ isDisplay: boolean }>`
  width: 90%;
  height: ${props => (props.isDisplay ? '10rem' : '0px')};
  transition: 1s all;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TraceGraph = styled.div`
  width: 100%;
  height: 70%;
  background-color: #eeeeee;
  border-radius: 10px;
`;

const TomorrowRanking = styled.div`
  width: 100%;
  height: 30%;
  background-color: #eeeeee;
  border-radius: 10px;
`;

const InfoDetailModal = () => {
  const [isSecondLevel, setIsSecondLevel] = useState(false);

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(!isSecondLevel);
  };

  return (
    <ModalLayout>
      {isSecondLevel ? (
        <img
          src='https://ifh.cc/g/l7kvV4.png'
          onClick={toggleSecondLevelContents}
        />
      ) : (
        <img
          src='https://ifh.cc/g/ZdS1bD.png'
          onClick={toggleSecondLevelContents}
        />
      )}
      <BookmarkIcon src='https://ifh.cc/g/7qPCCL.png' />
      <Title>
        현재 <TitleLocation>학동역</TitleLocation>은 놀기 좋아보여요 🙃
      </Title>
      <PopulationBox>
        <img src='https://ifh.cc/g/2GQfXw.png' />
        <PopulationInfo>
          <p>현재 인구</p>
          <p>12,345명~15,000명</p>
        </PopulationInfo>
      </PopulationBox>
      <SecondLevelBox isDisplay={isSecondLevel}>
        <TraceGraph></TraceGraph>
        <TomorrowRanking></TomorrowRanking>
      </SecondLevelBox>
      <TomorrowButton>내일 갈꺼야? :&#41;</TomorrowButton>
    </ModalLayout>
  );
};

export default InfoDetailModal;
