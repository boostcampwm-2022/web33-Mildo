import { useEffect, useState, useRef, Suspense } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import styled, { css } from 'styled-components';

import {
  BookmarkIcon,
  PopulationBox,
  PopulationInfo,
  Title,
  TitleLocation,
  TitleBox,
  TomorrowButton,
  ModalLayout,
  TimeLabel
} from '../InfoDetailModal/InfoDetailModal.style';
import Modal from '../Modal/Modal';
import {
  isInfoDetailModalOpenAtom,
  firstLevelInfoAtom,
  isSecondLevelAtom
} from '../../atom/infoDetail';
import {
  BOOKMARK_INFO,
  COLOR_PALETTE,
  INFO_DETAIL_TITLE
} from '../../config/constants';
import apis from '../../apis/apis';
import SecondLevelComponent from '../SecondLevelComponent/SecondLevelComponent';
import { userInfoAtom, userBookmarkAtom } from '../../atom/userInfo';
import { makeTime } from '../../utils/time.util';
import MapLoading from '../MapLoading/MapLoading';

const GraphLoadingPageStyle = styled.div<{ isDisplay: boolean }>`
  width: 100%;
  height: ${props => (props.isDisplay ? '10rem' : '0px')};
  transition: 1s all;
  background-color: ${COLOR_PALETTE.GREY20};
  border-radius: 10px;
  overflow: hidden;
`;

const InfoDetailModal = () => {
  const [isInfoDetailModalOpen] = useAtom(isInfoDetailModalOpenAtom);
  const firstLevelInfo = useAtomValue(firstLevelInfoAtom);
  const [prevFirstLevelInfo, setPrevFirstLevelInfo] = useAtom(
    prevFirstLevelInfoAtom
  );
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [isSecondLevel, setIsSecondLevel] = useAtom(isSecondLevelAtom);

  const [graphInfo, setGraphInfo] = useState<SecondLevelTimeInfoCacheTypes>({});
  const [titleWidth, setTitleWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [slidable, setSlidable] = useState<boolean>(true);

  const titleWidthRef = useRef<HTMLHeadingElement>(null);

  const success = (data: graphInfoResponseTypes | null) => {
    if (data) {
      setGraphInfo(data.data);
      setPrevFirstLevelInfo(firstLevelInfo);
    }
  };

  const [isSecondLevel, setIsSecondLevel] = useAtom(isSecondLevelAtom);
  const setUserBookmark = useSetAtom(userBookmarkAtom);
  const [userInfo] = useAtom(userInfoAtom);

  const toggleSecondLevelContents = () => {
    setIsSecondLevel(prev => !prev);
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

  const onClickTomorrow = () => {
    alert('추후 업데이트 예정입니다.');
  };

  useEffect(() => {
    if (!isSecondLevel) {
      setGraphInfo({});
      return;
    }

    setPastInformation();
  }, [isSecondLevel]);

  useEffect(() => {
    if (titleWidthRef && titleWidthRef.current) {
      setTitleWidth(titleWidthRef.current.clientWidth);
    }
  }, [firstLevelInfo]);

  useEffect(() => {
    const checkViewportWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', checkViewportWidth);

    return () => {
      window.removeEventListener('resize', checkViewportWidth);
    };
  }, []);

  useEffect(() => {
    if (titleWidth + 50 > windowWidth) {
      setSlidable(true);
      return;
    }
    setSlidable(false);
  }, [titleWidth, windowWidth]);

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
          <TitleBox>
            <Title ref={titleWidthRef} slide={slidable} textWidth={titleWidth}>
              현재&nbsp;
              <TitleLocation
                populationLevel={firstLevelInfo[1].populationLevel}>
                {firstLevelInfo[0]}
              </TitleLocation>
              {INFO_DETAIL_TITLE[firstLevelInfo[1].populationLevel]}
            </Title>
            {slidable ? (
              <Title
                ref={titleWidthRef}
                slide={slidable}
                textWidth={titleWidth}>
                현재&nbsp;
                <TitleLocation
                  populationLevel={firstLevelInfo[1].populationLevel}>
                  {firstLevelInfo[0]}
                </TitleLocation>
                {INFO_DETAIL_TITLE[firstLevelInfo[1].populationLevel]}
              </Title>
            ) : (
              <></>
            )}
          </TitleBox>
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
          <GraphLoadingPageStyle isDisplay={isSecondLevel}>
            {isSecondLevel && (
              <Suspense
                fallback={
                  <>
                    <MapLoading
                      message={null}
                      width='50px'
                      height='50px'
                      customLoadingPageStyle={css`
                        width: 100%;
                        height: 100%;
                      `}
                    />
                  </>
                }>
                <SecondLevelComponent
                  firstLevelInfo={firstLevelInfo}
                  isSecondLevel={isSecondLevel}
                />
              </Suspense>
            )}
          </GraphLoadingPageStyle>
          <TomorrowButton>내일 갈 거야! :&#41;</TomorrowButton>
        </ModalLayout>
      )}
    </Modal>
  );
};

export default InfoDetailModal;
