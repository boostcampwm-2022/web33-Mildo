import { useAtom } from 'jotai';
import { css } from 'styled-components';

import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import Modal from '../Modal/Modal';
import { Z_INDEX } from '../../config/constants';
import { userInfoAtom } from '../../atom/userInfo';

const MyInfoSideBar = () => {
  const [isMyInfoSideBarOpen] = useAtom(isMyInfoSideBarOpenAtom);
  const [userInfo] = useAtom(userInfoAtom);

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

  return (
    <Modal
      isOpen={isMyInfoSideBarOpen}
      background={true}
      customModalStyle={SideBarLayout}>
      <h2>
        안녕하세요
        <br />
        <span>{userInfo?.email}</span>님 😌
      </h2>
    </Modal>
  );
};

export default MyInfoSideBar;
