import styled, { CSSProp } from 'styled-components';
import { Z_INDEX } from '../../config/constants';

interface ModalContainerProps {
  customModalStyle?: CSSProp;
}

const ModalContainer = styled.div<ModalContainerProps>`
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
