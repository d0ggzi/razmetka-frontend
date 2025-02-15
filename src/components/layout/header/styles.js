import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    padding-left: 36px;
    padding-right: 36px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: ${(props) => props.theme.headerHeight};
    padding-top: 0;
    padding-bottom: 0;
    background-color: ${(props) => props.theme.headerColor};
    align-items: center;
    box-sizing: border-box;
`