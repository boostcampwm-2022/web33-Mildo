import { useAtom } from 'jotai';
import styled from 'styled-components';

import Modal from '../Modal/Modal';
import { isLoginModalOpenAtom } from '../../atom/login';
import ModalFilter from '../ModalFilter/ModalFilter';

const LoginModalLayout = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  max-width: 300px;
  min-width: 250px;
  height: 150px;
  background-color: white;
  display: block;

  border-radius: 10px;
`;

const LoginModal = () => {
  const [isLoginModalOpen] = useAtom(isLoginModalOpenAtom);

  return (
    <Modal isOpen={isLoginModalOpen}>
      <ModalFilter />
      <LoginModalLayout></LoginModalLayout>{' '}
    </Modal>
  );
};

export default LoginModal;
