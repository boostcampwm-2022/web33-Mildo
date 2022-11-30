import { useEffect, useState } from 'react';
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
  firstLevelInfoAtom,
  secondLevelInfoAtom
} from '../../atom/infoDetail';
import { SecondLevelTimeInfoTypes } from '../../types/interfaces';
import { INFO_DETAIL_TITLE } from '../../config/constants';
import apis from '../../apis/apis';

const InfoDetailModal = () => {
  const [isInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
  const [firstLevelInfo] = useAtom(firstLevelInfoAtom);
  const [isSecondLevel, setIsSecondLevel] = useState<boolean>(false);
  const [secondLevelInfo, setSecondLevelInfo] = useAtom(secondLevelInfoAtom);

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(prev => !prev);
  };

  const getPastInformation =
    async (): Promise<SecondLevelTimeInfoTypes | null> => {
      if (!firstLevelInfo) {
        return null;
      }
      const [areaName] = firstLevelInfo;

      // 전역에 areaName을 키로 갖고 있는 속성이 있으면 hit
      if (secondLevelInfo[areaName]) {
        return secondLevelInfo[areaName];
      }

      // 아니면 api 호출
      const { data } = await apis.getPastInfomation(areaName);

      setSecondLevelInfo({ ...secondLevelInfo, [areaName]: data });

      return data;
    };

  const paintGraph = async () => {
    const pastInformation = await getPastInformation();

    console.log(pastInformation);
  };

  useEffect(() => {
    if (!isSecondLevel) {
      return;
    }

    paintGraph();
  }, [isSecondLevel]);

  return (
    <Modal isOpen={isInfoDetailModalOpen}>
      {firstLevelInfo && (
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
            <TitleLocation populationLevel={firstLevelInfo[1].populationLevel}>
              {firstLevelInfo[0]}
            </TitleLocation>
            {INFO_DETAIL_TITLE[firstLevelInfo[1].populationLevel]}
          </Title>
          <PopulationBox>
            <img src='https://ifh.cc/g/2GQfXw.png' />
            <PopulationInfo>
              <p>현재 인구</p>
              <p>
                {firstLevelInfo[1].populationMin.toLocaleString()}명~
                {firstLevelInfo[1].populationMax.toLocaleString()}명
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
