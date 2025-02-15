/* eslint-disable react/prop-types */
import { ModalButton, ModalContent, StyledModal } from "./styles";
function Modal ({modalActive, setModalActive, children}){
    return (
    <>  
        <StyledModal $modalActive={modalActive} onClick={() => setModalActive(false)}>
            <ModalContent onClick = {e => e.stopPropagation()}>
              <ModalButton onClick={() => setModalActive(false)}>
                X
              </ModalButton>
              {children}
            </ModalContent>
        </StyledModal>
    </>
  );
}

export default Modal;