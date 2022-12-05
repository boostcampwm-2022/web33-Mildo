import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';
import { useDeferredValue, useEffect, useState } from 'react';

import { isLoginModalOpenAtom } from '../../atom/loginModal';
import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import { createMyButtonSvg } from '../../utils/button.util';
import RelatedAreaList from '../RelatedAreaList/RelatedAreaList';
import apis from '../../apis/apis';

const FlexBoxStyle = styled.div`
  z-index: 0;
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

  const onClickMyButton = () => {
    if (isLoggedIn) {
      setIsMyInfoSideBarOpen(true);
      return;
    }
    setIsLoginModalOpen(true);
  };

  const [searchAreaName, setSearchAreaName] = useState('');
  const deferredSearchAreaName = useDeferredValue(searchAreaName);

  const [relatedAreaInfo, setRelatedAreaInfo] = useState({});

  useEffect(() => {
    const getRelatedAreaInfo = async () => {
      const { data: responseRelatedAreaInfo }: GetRelatedAreaResponseTypes =
        await apis.getRelatedAreaInfo(searchAreaName);

      setRelatedAreaInfo(responseRelatedAreaInfo);
    };

    getRelatedAreaInfo();
  }, [deferredSearchAreaName]);

  const onChangeSearchBar: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    console.log('onchange');

    setSearchAreaName(e.target.value);
  };

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
