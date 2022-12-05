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
  secondLevelInfoCacheAtom,
  isSecondLevelAtom
} from '../../atom/infoDetail';
import { SecondLevelTimeInfoCacheTypes } from '../../types/interfaces';
import { INFO_DETAIL_TITLE } from '../../config/constants';
import apis from '../../apis/apis';
import SecondLevelComponent from '../SecondLevelComponent/SecondLevelComponent';
import { userInfoAtom } from '../../atom/userInfo';

const InfoDetailModal = () => {
  const [isInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
  const firstLevelInfo = useAtomValue(firstLevelInfoAtom);
  const [isSecondLevel, setIsSecondLevel] = useAtom(isSecondLevelAtom);
  const [secondLevelInfoCache, setSecondLevelInfoCache] = useAtom(
    secondLevelInfoCacheAtom
  );
  const [graphInfo, setGraphInfo] = useState<SecondLevelTimeInfoCacheTypes>({});

  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(prev => !prev);
  };

  // 그래프에 필요한 이전 시간 정보 호출
  const setPastInformation = async (): Promise<undefined> => {
    if (!firstLevelInfo) {
      return;
    }
    const [areaName] = firstLevelInfo;

    // 전역에 areaName을 키로 갖고 있는 속성이 있으면 hit
    if (secondLevelInfoCache[areaName]) {
      setGraphInfo(secondLevelInfoCache[areaName]);
      return;
    }

    // 아니면 api 호출
    const { data } = await apis.getPastInformation(areaName);

    setSecondLevelInfoCache({ ...secondLevelInfoCache, [areaName]: data });
    setGraphInfo(data);

    // eslint-disable-next-line no-useless-return
    return;
  };

  // 북마크 등록 및 삭제
  const onClickBookmark = async () => {
    if (!firstLevelInfo || !userInfo) {
      alert('북마크는 로그인 후 사용 가능합니다.');
      return;
    }
    const [areaName] = firstLevelInfo;
    const { _id: userId, bookmarks } = userInfo;

    if (bookmarks.includes(areaName)) {
      await apis.deleteBookmark(areaName, userId);
      setUserInfo({
        ...userInfo,
        bookmarks: bookmarks.filter(bookmark => bookmark !== areaName)
      });
    } else {
      if (bookmarks.length >= 5) {
        alert('북마크는 최대 5개까지 등록 가능합니다.');
        return;
      }
      await apis.addBookmark(areaName, userId);
      setUserInfo({
        ...userInfo,
        bookmarks: bookmarks.concat(areaName)
      });
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
          {userInfo && userInfo.bookmarks.includes(firstLevelInfo[0]) ? (
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
