import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';

import {
  BookmarkIcon,
  PopulationBox,
  PopulationInfo,
  Title,
  TitleLocation,
  TomorrowButton,
  ModalLayout
} from '../InfoDetailModal/InfoDetailModal.style';
import Modal from '../Modal/Modal';
import {
  isInfoDetailModalOpenAtom,
  firstLevelInfoAtom,
  isSecondLevelAtom,
  prevFirstLevelInfoAtom
} from '../../atom/infoDetail';
import {
  graphInfoResponseTypes,
  SecondLevelTimeInfoCacheTypes
} from '../../types/interfaces';
import { INFO_DETAIL_TITLE } from '../../config/constants';
import SecondLevelComponent from '../SecondLevelComponent/SecondLevelComponent';
import useGraphInfo from '../../hooks/useGraphInfo';

const InfoDetailModal = () => {
  const [isInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
  const firstLevelInfo = useAtomValue(firstLevelInfoAtom);
  const [prevFirstLevelInfo, setPrevFirstLevelInfo] = useAtom(
    prevFirstLevelInfoAtom
  );
  const [isSecondLevel, setIsSecondLevel] = useAtom(isSecondLevelAtom);
  const [graphInfo, setGraphInfo] = useState<SecondLevelTimeInfoCacheTypes>({});

  const success = (data: graphInfoResponseTypes | null) => {
    if (data) {
      setGraphInfo(data.data);
      setPrevFirstLevelInfo(firstLevelInfo);
    }
  };

  const [graphInfoResponse] = useGraphInfo(
    isSecondLevel,
    firstLevelInfo,
    prevFirstLevelInfo,
    success
  );

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(prev => !prev);
  };

  const setPastInformation = async (): Promise<undefined> => {
    if (!firstLevelInfo) {
      return;
    }

    if (graphInfoResponse) {
      setGraphInfo(graphInfoResponse.data);
      setPrevFirstLevelInfo(firstLevelInfo);
    }

    // eslint-disable-next-line no-useless-return
    return;
  };

  useEffect(() => {
    if (!isSecondLevel) {
      setGraphInfo({});
      return;
    }

    setPastInformation();
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
          <SecondLevelComponent
            isDisplay={isSecondLevel}
            graphInfo={graphInfo}
          />
          <TomorrowButton>내일 갈 거야! :&#41;</TomorrowButton>
        </ModalLayout>
      )}
    </Modal>
  );
};

export default InfoDetailModal;
