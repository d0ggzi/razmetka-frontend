import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

export const TextInput = styled.textarea`
    box-sizing: border-box;
    width: 600px;
    min-height: 300px;
    max-height: 600px;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.unactiveTabColor};
    margin-bottom: 16px;
    resize: vertical;
    overflow: auto;
    white-space: pre-wrap;
`;

export const SubmitButton = styled.input`
    width: 350px;
    height: 35px;
    margin: 0 auto;
    text-align: center;
    border: none;
    margin-bottom: 20px;
    border-radius: 4px;
    background-color: #285FCB;
    color: ${(props) => props.theme.colorWhite};
    cursor: pointer;

    &:disabled {
        background-color: #ABB5BE;
        color: #54595E;
        cursor: auto;
    }
`

export const InfoCreateStatus = styled.span`
    display: block;
    margin: 0 auto;
    font-size: 12px;
`