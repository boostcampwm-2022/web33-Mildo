import { useAtom } from 'jotai';
import styled, { css } from 'styled-components';

import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import Modal from '../Modal/Modal';
import { Z_INDEX } from '../../config/constants';

const MyInfoSideBar = () => {
  const [isMyInfoSideBarOpen, setIsMyInfoSideBarOpen] = useAtom(
    isMyInfoSideBarOpenAtom
  );

  const SideBarLayout = css`
    z-index: ${Z_INDEX.MODAL};
    background-color: white;
    display: block;
    width: 60%;
    max-width: 450px;

    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;

    h2 {
      margin-left: 1rem;
      margin-top: 1rem;

      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 800;
      font-size: 1.5rem;
      line-height: 19px;
      line-height: 1.5;

      span {
        color: #6349ff;
        font-size: 2rem;
      }
    }
  `;

  const LogoutLink = styled.a`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);

    font-size: 1rem;
  `;

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
      <h2>
        안녕하세요
        <br />
        <span>상준</span>님 😌
      </h2>
      <LogoutLink href={`${apiServerURL}/naver/auth/logout`}>
        로그아웃
      </LogoutLink>
    </Modal>
  );
};

export default MyInfoSideBar;
