import styled from "styled-components";

export const StyledBurger = styled.button`
    width: 32px;
    height: 32px;
    border: none;
    margin-right: 16px;
    background-color: transparent;
    cursor: pointer;
    background-image: url('/assets/burger.svg');
`

export const SideBar = styled.nav`
    background-color: ${(props) => props.theme.colorWhite};
    padding-top: 14px;
    padding-left: 36px;
    padding-right: 24px;
    width: 305px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: ${(props) => props.$sidebar ? `-100%` : `0%`};
    transition: 850ms;
    z-index: 100;
`

export const SideBarTop = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
`

export const CloseButton = styled.button`
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    background-image: url('/assets/closeButton.svg');
`
