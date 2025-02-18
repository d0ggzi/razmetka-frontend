import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const TextInput = styled.textarea`
    box-sizing: border-box;
    width: 350px;
    height: 100px;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props)=> props.theme.buttonColor};
    margin-top: 10px;
    resize: vertical;
`;

export const Select = styled.select`
    width: 350px;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props)=> props.theme.buttonColor};
    background-color: #ffffff;
    cursor: pointer;
`;

export const SubmitButton = styled.input`
    height: 40px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid #ccc;
    background-color: ${(props)=> props.theme.buttonColor};
    color: #ffffff;
    cursor: pointer;
    padding: 10px 15px;

    &:hover {
        background: #12776c;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

export const InfoCreateStatus = styled.p`
    font-size: 14px;
    color: ${(props) => (props.success ? "red" : "green")};
    font-weight: bold;
    margin-top: 10px;
`;
