import styled from "styled-components";


export const ProjectHeader = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.theme.headerHeight};
    margin: 0;
    font-size: 20px;
    background-color: #F8F9FA;
`

export const ProjectName = styled.span`
  text-align: center;
`


export const MainSection = styled.section`
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    width: 100vw;
    background-color: ${(props) => props.theme.mainBackgroundColor};
    padding: 16px 130px 0px 130px;
`