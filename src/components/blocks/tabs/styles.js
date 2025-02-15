import styled from "styled-components";

export const TabButtonContainer = styled.div`
    display:flex;
`

export const TabButton = styled.button`
    width: 172px;
    height: 53px;
    border: none;
    cursor: pointer;
    background-color: ${(props)=>props.$isActive ? 
        props.theme.activeTabColor 
        : props.theme.unactiveTabColor};
    border-radius: 8px 8px 0px 0px;
    font-family: ${(props) => props.theme.fontFamily};
    font-size: ${(props) => props.theme.fontSizeDefault};
`

export const TabContent = styled.section`
    width: 100%;
    display: ${(props)=>props.$isActive ? `block` : `none`};
    background-color: ${(props)=>props.$isActive ? 
        props.theme.activeTabColor 
        : props.theme.unactiveTabColor};
    border-radius: 0px 16px 16px 16px; 
    padding: 15px;
    min-width: 600px;

    font-family: ${(props) => props.theme.fontFamily};
    font-size: ${(props) => props.theme.fontSizeDefault};
`
