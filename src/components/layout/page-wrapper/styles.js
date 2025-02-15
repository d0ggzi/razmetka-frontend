import styled from "styled-components";

export const StyledPageWrapper = styled.main`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column; 
    background-color: ${(props) => props.theme.mainBackgroundColor};
`