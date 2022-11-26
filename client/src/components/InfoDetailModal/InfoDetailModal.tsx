import { useState } from 'react';
import {
  BookmarkIcon,
  PopulationBox,
  PopulationInfo,
  SecondLevelBox,
  Title,
  TitleLocation,
  TomorrowButton,
  TomorrowRanking,
  TraceGraph
} from '../InfoDetailModal/InfoDetailModal.style';
import Modal from '../Modal/Modal';

const InfoDetailModal = () => {
  const [isOpen] = useState<boolean>(true);
  const [isSecondLevel, setIsSecondLevel] = useState<boolean>(false);

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(prev => !prev);
  };

  return (
    <Modal isOpen={isOpen}>
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
    </Modal>
  );
};

export default InfoDetailModal;
