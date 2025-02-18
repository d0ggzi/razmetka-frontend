import styled from "styled-components";

export const StyledImage = styled.img`
    width: 300px;
    height: 350px;
    object-fit: cover;
    margin: 10px 0;
`;

export const StyledLink = styled.a`
    display: block;
    color: #007bff;
    text-decoration: none;
    margin-top: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

export const StyledButton = styled.button`
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    &:hover {
        background: #0056b3;
    }
`;

export const StyledCard = styled.div`
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Sidebar = styled.div`
    width: 40%;
`;

export const InfoContainer = styled.div`
    width: 49%;
`;

export const LabelGroup = styled.div`
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
    width: 16px;
    height: 16px;
    cursor: pointer;
`;

export const StyledRadio = styled.input.attrs({ type: "radio" })`
    width: 16px;
    height: 16px;
    cursor: pointer;
`;