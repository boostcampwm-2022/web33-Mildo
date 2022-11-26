import styled, { CSSProp } from 'styled-components';
import { Z_INDEX } from '../../config/constants';

interface ModalContainerProps {
  customModalStyle?: CSSProp;
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  bottom: 0%;
  left: 0%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 35rem;
  height: auto;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  transition: 0.2s all;
  z-index: ${Z_INDEX.MODAL};
  ${props => props.customModalStyle && props.customModalStyle}
`;

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  customModalStyle?: CSSProp;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  customModalStyle
}) => {
  return (
    <>
      {isOpen && (
        <ModalContainer customModalStyle={customModalStyle}>
          {children}
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
