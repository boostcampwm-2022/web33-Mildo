import { useEffect, useState, useRef, Suspense, lazy } from 'react';
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
import { userBookmarkAtom, userInfoAtom } from '../../atom/userInfo';
import { makeTime } from '../../utils/time.util';
import MapLoading from '../MapLoading/MapLoading';

import bookmarkOff from '../../../public/assets/bookmarkOff.svg';
import bookmarkOn from '../../../public/assets/bookmarkOn.svg';
import downChevron from '../../../public/assets/downChevron.svg';
import upChevron from '../../../public/assets/upChevron.svg';
import human from '../../../public/assets/human.svg';

const SecondLevelComponent = lazy(
  () => import('../SecondLevelComponent/SecondLevelComponent')
);

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
  const [isSecondLevel, setIsSecondLevel] = useAtom(isSecondLevelAtom);
  const setBookmarkAtom = useSetAtom(userBookmarkAtom);
  const [userInfo] = useAtom(userInfoAtom);

  const [titleWidth, setTitleWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [slidable, setSlidable] = useState<boolean>(true);

  const titleWidthRef = useRef<HTMLHeadingElement>(null);

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
        setBookmarkAtom(
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

      setBookmarkAtom(bookmarks.concat(areaName));
    } catch (error) {
      throw error;
    }
  };

  const onClickTomorrow = () => {
    alert('추후 업데이트 예정입니다.');
  };

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
    if (titleWidth + 150 > windowWidth) {
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
            <img src={downChevron} onClick={toggleSecondLevelContents} />
          ) : (
            <img src={upChevron} onClick={toggleSecondLevelContents} />
          )}

          {userInfo.data.isLoggedIn &&
          userInfo.data.bookmarks.includes(firstLevelInfo[0]) ? (
            <BookmarkIcon src={bookmarkOn} onClick={onClickBookmark} />
          ) : (
            <BookmarkIcon src={bookmarkOff} onClick={onClickBookmark} />
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
            <img src={human} />
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
              {isSecondLevel && (
                <SecondLevelComponent
                  firstLevelInfo={firstLevelInfo}
                  isSecondLevel={isSecondLevel}
                />
              )}
            </Suspense>
          </GraphLoadingPageStyle>
          <TomorrowButton onClick={onClickTomorrow}>
            내일 갈 거야! :&#41;
          </TomorrowButton>
        </ModalLayout>
      )}
    </Modal>
  );
};

export default InfoDetailModal;
