import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';

import { isLoginModalOpenAtom } from '../../atom/loginModal';
import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import { createMyButtonSvg } from '../../utils/button.util';

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
  padding-left: 8px;

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

  return (
    <FlexBoxStyle>
      <SearchBar placeholder='검색' />
      <MyButton
        onClick={onClickMyButton}
        dangerouslySetInnerHTML={{
          __html: createMyButtonSvg()
        }}></MyButton>
    </FlexBoxStyle>
  );
};

export default SearchBarAndMyBtn;
