import { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import {
  BookmarkIcon,
  PopulationBox,
  PopulationInfo,
  Title,
  TitleLocation,
  TomorrowButton,
  ModalLayout,
  TimeLabel
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
import { BOOKMARK_INFO, INFO_DETAIL_TITLE } from '../../config/constants';
import apis from '../../apis/apis';
import SecondLevelComponent from '../SecondLevelComponent/SecondLevelComponent';
import { userInfoAtom, userBookmarkAtom } from '../../atom/userInfo';
import useGraphInfo from '../../hooks/useGraphInfo';
import { makeTime } from '../../utils/time.util';

const InfoDetailModal = () => {
  const [isInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
  const firstLevelInfo = useAtomValue(firstLevelInfoAtom);
  const [prevFirstLevelInfo, setPrevFirstLevelInfo] = useAtom(
    prevFirstLevelInfoAtom
  );
  const [isSecondLevel, setIsSecondLevel] = useAtom(isSecondLevelAtom);
  const [graphInfo, setGraphInfo] = useState<SecondLevelTimeInfoCacheTypes>({});
  const setUserBookmark = useSetAtom(userBookmarkAtom);
  const [userInfo] = useAtom(userInfoAtom);

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

  // 그래프에 필요한 이전 시간 정보 호출
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

  // 북마크 등록 및 삭제
  const onClickBookmark = async () => {
    if (!firstLevelInfo || !userInfo.data.isLoggedIn) {
      alert(BOOKMARK_INFO.failErrorMessage);
      return;
    }
    const [areaName] = firstLevelInfo;
    const { _id: userId, bookmarks } = userInfo.data;

    if (bookmarks.includes(areaName)) {
      try {
        await apis.deleteBookmark(areaName, userId);
        setUserBookmark(
          bookmarks.filter((bookmark: string) => bookmark !== areaName)
        );
        return;
      } catch (error) {
        throw error;
      }
    }

    if (bookmarks.length >= BOOKMARK_INFO.maxNumber) {
      alert(BOOKMARK_INFO.maxErrorMessage);
      return;
    }

    try {
      await apis.addBookmark(areaName, userId);
      setUserBookmark(bookmarks.concat(areaName));
    } catch (error) {
      throw error;
    }
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

          {userInfo.data.isLoggedIn &&
          userInfo.data.bookmarks.includes(firstLevelInfo[0]) ? (
            <BookmarkIcon
              src='https://ifh.cc/g/SgQaZx.png'
              onClick={onClickBookmark}
            />
          ) : (
            <BookmarkIcon
              src='https://ifh.cc/g/7qPCCL.png'
              onClick={onClickBookmark}
            />
          )}
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
              <div>
                <p>현재 인구</p>
                <TimeLabel>
                  {makeTime(firstLevelInfo[1].populationTime, 0)}
                </TimeLabel>
              </div>
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
