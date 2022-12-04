import { useAtom } from 'jotai';
import styled, { css } from 'styled-components';
import { IoClose } from 'react-icons/io5';

import Modal from '../Modal/Modal';
import { isLoginModalOpenAtom } from '../../atom/loginModal';
import { createNaverLoginSvg } from '../../utils/login.util';
import { Z_INDEX } from '../../config/constants';

const LoginModalLayout = css`
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

  z-index: ${Z_INDEX.MODAL};
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

  &:hover {
    cursor: pointer;
  }
`;

const apiServerURL =
  process.env.REACT_APP_CLIENT_ENV === 'development'
    ? process.env.REACT_APP_API_SERVER_URL_DEVELOPMENT
    : process.env.REACT_APP_API_SERVER_URL_PRODUCTION;

const LoginModal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useAtom(isLoginModalOpenAtom);

  return (
    <Modal
      isOpen={isLoginModalOpen}
      customModalStyle={LoginModalLayout}
      background={true}
      isClickModalFilter={setIsLoginModalOpen}>
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
      <a href={`${apiServerURL}/naver/auth/login`}>
        <NaverLoginBtn
          dangerouslySetInnerHTML={{
            __html: createNaverLoginSvg()
          }}
        />
      </a>
    </Modal>
  );
};

export default LoginModal;
