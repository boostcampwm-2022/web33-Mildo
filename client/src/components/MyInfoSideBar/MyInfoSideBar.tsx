import { useAtom, useAtomValue } from 'jotai';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import Modal from '../Modal/Modal';
import { userBookmarkAtom, userInfoAtom } from '../../atom/userInfo';
import {
  Z_INDEX,
  POPULATION_LEVEL_COLOR,
  COLOR_PALETTE
} from '../../config/constants';
import { allAreasInfoAtom } from '../../atom/areasInfo';
import {
  SortAllAreasTypes,
  CoordinatesPopulationTypes
} from '../../types/interfaces';
import apis from '../../apis/apis';
import { markerArray } from '../../atom/markerArray';

const SideBarLayout = css`
  z-index: ${Z_INDEX.MODAL};
  background-color: white;
  display: block;
  width: 60%;
  max-width: 500px;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
`;

const HeaderComponent = styled.div`
  h1 {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 800;
    line-height: 1.5;
  }

  h1:first-child {
    font-size: 1rem;
  }

  h1:last-child {
    font-size: 1.3rem;
    margin-top: 5px;

    span {
      color: ${COLOR_PALETTE.PRIMARY};
      font-size: 1.7rem;
    }
  }
`;

const BookmarkListComponent = styled.div`
  margin-top: 50px;
  width: 100%;

  h1 {
    color: ${COLOR_PALETTE.PRIMARY};
    font-size: 1rem;
  }

  hr {
    width: 100%;
    border: 1px solid ${COLOR_PALETTE.PRIMARY};
  }
`;

interface PopulationLevelProps {
  populationLevel: string;
}

const BookmarkItemComponent = styled.div<PopulationLevelProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: 15px;

  > div:first-child {
    width: 85%;
    display: flex;
    align-items: center;
  }

  > div:last-child {
    width: 15%;
    cursor: pointer;
    font-size: 0.7rem;
    color: ${COLOR_PALETTE.GREY};
    text-align: right;
  }

  .population-level {
    width: 15px;
    height: 15px;
    margin: 0;
    background: ${props => POPULATION_LEVEL_COLOR[props.populationLevel].fill};
    border: 1px solid
      ${props => POPULATION_LEVEL_COLOR[props.populationLevel].stroke};
    border-radius: 10px;
    margin-right: 10px;
  }

  .area-name {
    width: 85%;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
`;

const LogoutLink = styled.a`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);

  text-decoration: none;
  border-bottom: 1px solid ${COLOR_PALETTE.GREY};

  font-size: 0.8rem;
  color: ${COLOR_PALETTE.GREY};
`;

const MyInfoSideBar: React.FC = () => {
  const [isMyInfoSideBarOpen, setIsMyInfoSideBarOpen] = useAtom(
    isMyInfoSideBarOpenAtom
  );
  const areas = useAtomValue(allAreasInfoAtom);
  const [myBookmarks, setMyBookmarks] = useState<SortAllAreasTypes[] | null>(
    null
  );
  const markers = useAtomValue(markerArray);

  const [, setUserBookmark] = useAtom(userBookmarkAtom);
  const [userInfo] = useAtom(userInfoAtom);

  // 전체 장소에서 북마크에 등록된 정보만 가져옴
  const makeBookmarks = () => {
    if (!userInfo.data.isLoggedIn) {
      return;
    }

    setMyBookmarks(
      areas.filter(area => userInfo.data.bookmarks.includes(area[0])).reverse()
    );
  };

  // 사이드바에서 북마크 삭제
  const onClickDelete = async (areaName: string) => {
    if (!userInfo.data || !areas) {
      return;
    }

    const { _id: userId, bookmarks } = userInfo.data;

    try {
      await apis.deleteBookmark(areaName, userId);

      setUserBookmark(
        bookmarks.filter((bookmark: string) => bookmark !== areaName)
      );
    } catch (error) {
      throw error;
    }
  };

  // MainPage에서 좌표 설정 setState 가져와서 클릭한 위치로 이동
  const onClickAreaName = (areaInfo: CoordinatesPopulationTypes) => {
    const { latitude, longitude } = areaInfo;

    const marker = markers.find(
      item =>
        item.getPosition().x === longitude && item.getPosition().y === latitude
    );

    if (!marker) {
      alert('혼잡도 필터를 확인해주세요!');
      return;
    }

    marker.trigger('click');
    setIsMyInfoSideBarOpen(false);
  };

  useEffect(() => {
    if (!userInfo.data || !areas) {
      return;
    }

    makeBookmarks();
  }, [userInfo, areas]);

  const apiServerURL =
    process.env.REACT_APP_CLIENT_ENV === 'development'
      ? process.env.REACT_APP_API_SERVER_URL_DEVELOPMENT
      : process.env.REACT_APP_API_SERVER_URL_PRODUCTION;

  return (
    <Modal
      isOpen={isMyInfoSideBarOpen}
      background={true}
      customModalStyle={SideBarLayout}
      isClickModalFilter={setIsMyInfoSideBarOpen}>
      <HeaderComponent>
        <h1>안녕하세요</h1>
        <h1>
          <span>{userInfo.data.nickname}</span>님 😌
        </h1>
      </HeaderComponent>
      <BookmarkListComponent>
        <h1>북마크</h1>
        <hr />
        {myBookmarks &&
          myBookmarks.map((bookmark, idx) => (
            <BookmarkItemComponent
              key={idx}
              populationLevel={bookmark[1].populationLevel}>
              <div>
                <div className='population-level' />
                <span
                  className='area-name'
                  onClick={() => onClickAreaName(bookmark[1])}>
                  {bookmark[0]}
                </span>
              </div>
              <button onClick={() => onClickDelete(bookmark[0])}>삭제</button>
            </BookmarkItemComponent>
          ))}
      </BookmarkListComponent>
      <LogoutLink href={`${apiServerURL}/naver/auth/logout`}>
        로그아웃
      </LogoutLink>
    </Modal>
  );
};

export default MyInfoSideBar;
