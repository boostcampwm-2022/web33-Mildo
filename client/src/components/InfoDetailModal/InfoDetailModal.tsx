import { useState } from 'react';
import { useAtom } from 'jotai';

import {
  BookmarkIcon,
  PopulationBox,
  PopulationInfo,
  SecondLevelBox,
  Title,
  TitleLocation,
  TomorrowButton,
  TomorrowRanking,
  TraceGraph,
  ModalLayout
} from '../InfoDetailModal/InfoDetailModal.style';
import Modal from '../Modal/Modal';
import {
  isInfoDetailModalOpenAtom,
  firstInfoAtom
} from '../../atom/infoDetail';
import { SortAllAreasTypes } from '../../types/interfaces';
import { INFO_DETAIL_TITLE } from '../../config/constants';

const InfoDetailModal = () => {
  const [isInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
  const [firstInfo] = useAtom<SortAllAreasTypes | null>(firstInfoAtom);
  const [isSecondLevel, setIsSecondLevel] = useState<boolean>(false);

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(prev => !prev);
  };

  return (
    <Modal isOpen={isInfoDetailModalOpen}>
      {firstInfo && (
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
            현재&nbsp;
            <TitleLocation populationLevel={firstInfo[1].populationLevel}>
              {firstInfo[0]}
            </TitleLocation>
            {INFO_DETAIL_TITLE[firstInfo[1].populationLevel]}
          </Title>
          <PopulationBox>
            <img src='https://ifh.cc/g/2GQfXw.png' />
            <PopulationInfo>
              <p>현재 인구</p>
              <p>
                {firstInfo[1].populationMin.toLocaleString()}명~
                {firstInfo[1].populationMax.toLocaleString()}명
              </p>
            </PopulationInfo>
          </PopulationBox>
          <SecondLevelBox isDisplay={isSecondLevel}>
            <TraceGraph></TraceGraph>
            <TomorrowRanking></TomorrowRanking>
          </SecondLevelBox>
          <TomorrowButton>내일 갈 거야! :&#41;</TomorrowButton>
        </ModalLayout>
      )}
    </Modal>
  );
};

export default InfoDetailModal;
