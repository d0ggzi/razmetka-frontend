import styled from "styled-components";

export const StyledModal = styled.div`
    height:100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: ${(props) => props.$modalActive ? `1` : `0`};
    pointer-events: ${(props) => props.$modalActive ? `all` : `none`};
    transition: 0.4s all;
`

export const ModalContent = styled.div`
    background-color: ${(props) => props.theme.colorWhite};
    border-radius: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
`

export const ModalButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.colorWhite};
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
`