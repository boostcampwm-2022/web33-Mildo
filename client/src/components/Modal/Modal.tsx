import { SetStateAction } from 'react';
import styled, { CSSProp } from 'styled-components';
import { Z_INDEX } from '../../config/constants';

interface ModalContainerProps {
  customModalStyle?: CSSProp;
}

const ModalContainer = styled.div<ModalContainerProps>`
  z-index: ${Z_INDEX.MODAL};
  ${props => props.customModalStyle && props.customModalStyle}
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${Z_INDEX.FILTER};
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
`;

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  background?: boolean;
  isClickModalFilter?: (update: SetStateAction<boolean>) => void;
  customModalStyle?: CSSProp;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  background = false,
  isClickModalFilter,
  customModalStyle
}) => {
  const clickModalHandler = () => {
    if (!isClickModalFilter) {
      return;
    }
    isClickModalFilter(false);
  };

  return (
    <>
      {isOpen && (
        <>
          {background && <Filter onClick={clickModalHandler} />}
          <ModalContainer customModalStyle={customModalStyle}>
            {children}
          </ModalContainer>
        </>
      )}
    </>
  );
};

export default Modal;
