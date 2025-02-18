import styled from "styled-components";

export const StyledList = styled.ul`
    &:before {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        position: absolute;
        background-image: url(${(props) =>
            props.$isOpen ? "/assets/arrow-up.png" : "/assets/arrow.svg"});
        background-repeat: no-repeat;
        left: -15px;
        top: 3px;
        transition: transform 0.3s ease-in-out;
    }
    cursor: pointer;
    list-style-type: none;
    margin: 0;
    margin-left: 28px;
    margin-bottom: 20px;
    padding: 0;
    position: relative;
    font-family: ${(props) => props.theme.fontFamily};
    font-size: ${(props) => props.theme.fontSizeDefault};
`;

export const SubList = styled.ul`
    list-style-type: none;
    margin-left: 10px;
    padding-left: 10px;
    max-height: ${(props) => (props.$isOpen ? "100px" : "0")};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;