import { useAtom } from 'jotai';
import styled from 'styled-components';

import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import ModalFilter from '../ModalFilter/ModalFilter';
import Modal from '../Modal/Modal';
import { Z_INDEX } from '../../config/constants';

const MyInfoSideBar = () => {
  const [isMyInfoSideBarOpen, setIsMyInfoSideBarOpen] = useAtom(
    isMyInfoSideBarOpenAtom
  );

  const SideBarLayout = styled.div`
    z-index: ${Z_INDEX.MODAL};
    background-color: white;
    display: block;
    width: 60%;
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
    <Modal isOpen={isMyInfoSideBarOpen}>
      <ModalFilter isClickModalFilter={setIsMyInfoSideBarOpen} />
      <SideBarLayout>
        <h2>
          안녕하세요
          <br />
          <span>상준</span>님 😌
        </h2>
      </SideBarLayout>
    </Modal>
  );
};

export default MyInfoSideBar;
