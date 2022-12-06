import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';
import { useDeferredValue, useEffect, useState } from 'react';

import { isLoginModalOpenAtom } from '../../atom/loginModal';
import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import { createMyButtonSvg } from '../../utils/button.util';
import RelatedAreaList from '../RelatedAreaList/RelatedAreaList';
import apis from '../../apis/apis';
import { isCompleteKorean } from '../../utils/search.util';
import { Z_INDEX } from '../../config/constants';

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
  width: 100%;
  height: 90%;

  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  padding-left: 10px;

  &::placeholder {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.3);
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
  const [searchAreaName, setSearchAreaName] = useState('');
  const [relatedAreaInfo, setRelatedAreaInfo] =
    useState<DataRelatedAreaInfoTypes>({});

  const deferredSearchAreaName = useDeferredValue(searchAreaName);

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
    if (!isCompleteKorean(deferredSearchAreaName)) {
      return;
    }

    const getRelatedAreaInfo = async () => {
      const { data: responseRelatedAreaInfo }: GetRelatedAreaResponseTypes =
        await apis.getRelatedAreaInfo(deferredSearchAreaName); // 이 부분도 캐싱하면 좋을듯?

      setRelatedAreaInfo(responseRelatedAreaInfo);
    };

    getRelatedAreaInfo();
  }, [deferredSearchAreaName]);

  return (
    <FlexBoxStyle>
      <SearchBar
        placeholder='검색'
        onChange={onChangeSearchBar}
        value={searchAreaName}
      />
      <MyButton
        onClick={onClickMyButton}
        dangerouslySetInnerHTML={{
          __html: createMyButtonSvg()
        }}></MyButton>
      <RelatedAreaList
        searchAreaName={deferredSearchAreaName}
        relatedAreaInfo={relatedAreaInfo}
      />
    </FlexBoxStyle>
  );
};

export default SearchBarAndMyBtn;
