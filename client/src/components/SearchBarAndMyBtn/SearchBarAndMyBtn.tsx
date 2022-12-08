import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import { isLoginModalOpenAtom } from '../../atom/loginModal';
import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import { createMyButtonSvg } from '../../utils/button.util';
import RelatedAreaList from '../RelatedAreaList/RelatedAreaList';
import apis from '../../apis/apis';
import { isCompleteKorean } from '../../utils/search.util';
import {
  Z_INDEX,
  DEBOUNCE_TIME,
  SEARCH_BAR_WIDTH_MAX
} from '../../config/constants';
import { isRelatedAreaListOpenAtom } from '../../atom/relatedAreaList';

const FlexBoxStyle = styled.div`
  z-index: ${Z_INDEX.FILTER};
  width: 92%;
  height: 3rem;

  max-width: 500px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  position: absolute;
  top: 2%;
  left: 50%;

  transform: translate(-50%, 0%);
`;

const SearchBar = styled.input`
  height: 90%;
  width: 100%;

  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  padding-left: 10px;

  &::placeholder {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

const MyButton = styled.button`
  margin-top: 9px;
  border: none;
  background: none;
  cursor: pointer;
`;

interface CoordinatesTypes {
  latitude: number;
  longitude: number;
}

interface DataRelatedAreaInfoTypes {
  [areaName: string]: CoordinatesTypes;
}

interface GetRelatedAreaResponseTypes {
  ok: boolean;
  data: DataRelatedAreaInfoTypes;
}

interface SearchBarAndMyBtnComponentProps {
  isLoggedIn: boolean;
}

const SearchBarAndMyBtn: React.FC<SearchBarAndMyBtnComponentProps> = ({
  isLoggedIn
}) => {
  const setIsLoginModalOpen = useUpdateAtom(isLoginModalOpenAtom);
  const setIsMyInfoSideBarOpen = useUpdateAtom(isMyInfoSideBarOpenAtom);
  const setIsRelatedAreaListOpen = useUpdateAtom(isRelatedAreaListOpenAtom);
  const [searchAreaName, setSearchAreaName] = useState('');
  const [relatedAreaInfo, setRelatedAreaInfo] =
    useState<DataRelatedAreaInfoTypes>({});
  const [searchBarWidth, setSearchBarWidth] = useState(0);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const searchBarWidthRef = useRef<HTMLInputElement>(null);

  const onClickMyButton = () => {
    if (isLoggedIn) {
      setIsMyInfoSideBarOpen(true);
      return;
    }
    setIsLoginModalOpen(true);
  };

  const onChangeSearchBar: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    setSearchAreaName(e.target.value);
  };

  useEffect(() => {
    if (searchAreaName === '') {
      return;
    }

    if (searchAreaName !== '' && !isCompleteKorean(searchAreaName)) {
      return;
    }

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(async () => {
      setIsRelatedAreaListOpen(true);

      const { data: responseRelatedAreaInfo }: GetRelatedAreaResponseTypes =
        await apis.getRelatedAreaInfo(searchAreaName);

      setRelatedAreaInfo(responseRelatedAreaInfo);
    }, DEBOUNCE_TIME);
  }, [searchAreaName]);

  // 검색바의 크기가 바뀌면 ref의 크기도 바꾸어야 한다.
  useEffect(() => {
    const checkSearchBarWidth = () => {
      if (
        searchBarWidthRef &&
        searchBarWidthRef.current!.clientWidth <= SEARCH_BAR_WIDTH_MAX
      ) {
        setSearchBarWidth(searchBarWidthRef.current!.clientWidth);
      }
    };

    window.addEventListener('resize', checkSearchBarWidth);

    return () => {
      window.removeEventListener('resize', checkSearchBarWidth);
    };
  }, []);

  return (
    <FlexBoxStyle>
      <SearchBar
        placeholder='검색'
        onChange={onChangeSearchBar}
        value={searchAreaName}
        ref={searchBarWidthRef}
      />
      <MyButton
        onClick={onClickMyButton}
        dangerouslySetInnerHTML={{
          __html: createMyButtonSvg()
        }}></MyButton>
      <RelatedAreaList
        searchAreaName={searchAreaName}
        relatedAreaInfo={relatedAreaInfo}
        widthValue={searchBarWidth}
      />
    </FlexBoxStyle>
  );
};

export default SearchBarAndMyBtn;
