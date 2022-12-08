import { SetStateAction } from 'react';
import styled, { CSSProp, keyframes, css } from 'styled-components';
import { Z_INDEX } from '../../config/constants';

interface ModalContainerProps {
  customModalStyle?: CSSProp;
  open: boolean;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    display: block;
  } 
  100% { 
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    display: block;
  } 
  100% { 
    opacity: 0;
  }
`;

const ModalContainer = styled.div<ModalContainerProps>`
  z-index: ${Z_INDEX.MODAL};
  ${props => props.customModalStyle && props.customModalStyle}
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  ${props => !props.open && `z-index: -100`};
  animation: ${props =>
    props.open
      ? css`
          ${fadeIn} .2s linear
        `
      : css`
          ${fadeOut} .2s linear
        `};
`;

const Filter = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: ${Z_INDEX.FILTER};
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  ${props => !props.open && `z-index: -100`};
  animation: ${props =>
    props.open
      ? css`
          ${fadeIn} .2s linear
        `
      : css`
          ${fadeOut} .2s linear
        `};
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
      <Filter onClick={clickModalHandler} open={isOpen && background} />
      <ModalContainer customModalStyle={customModalStyle} open={isOpen}>
        {children}
      </ModalContainer>
    </>
  );
};

export default Modal;
