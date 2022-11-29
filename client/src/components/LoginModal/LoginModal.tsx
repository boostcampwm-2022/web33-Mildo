import { useAtom } from 'jotai';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

import Modal from '../Modal/Modal';
import { isLoginModalOpenAtom } from '../../atom/login';
import ModalFilter from '../ModalFilter/ModalFilter';
import { createNaverLoginSvg } from '../../utils/login.util';

const LoginModalLayout = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  max-width: 300px;
  min-width: 265px;
  height: 150px;
  background-color: white;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TitleBar = styled.div`
  background-color: #6349ff;
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 10px 10px 0 0;

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: relative;

  button {
    background: none;
    border: none;
    padding-left: 7px;
    size: 20px;

    position: absolute;
    left: 0;
    top: 30%;
  }

  h2 {
    display: block;
    padding-top: 6px;
    margin: 0 auto;
    font-size: 20px;
    color: white;
  }
`;

const NaverLoginBtn = styled.button`
  background-color: white;
  border: none;
`;

const LoginModal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useAtom(isLoginModalOpenAtom);

  // (update: SetStateAction<boolean>) => void
  return (
    <Modal isOpen={isLoginModalOpen}>
      <ModalFilter isClickModalFilter={setIsLoginModalOpen} />
      <LoginModalLayout>
        <TitleBar>
          <button>
            <IoClose
              onClick={() => setIsLoginModalOpen(false)}
              style={{
                color: 'white',
                width: '18px',
                height: '18px'
              }}
            />
          </button>
          <h2>로그인</h2>
        </TitleBar>
        <NaverLoginBtn
          dangerouslySetInnerHTML={{
            __html: createNaverLoginSvg()
          }}></NaverLoginBtn>
      </LoginModalLayout>
    </Modal>
  );
};

export default LoginModal;
