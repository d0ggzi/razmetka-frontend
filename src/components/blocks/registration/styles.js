import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    box-sizing: border-box;
`

export const InputLabel = styled.label`
    font-size:14px;
    font-family: ${(props)=> props.theme.fontFamily};
    margin-bottom: 8px;
    box-sizing: border-box;
`

export const TextInput = styled.input`
    box-sizing: border-box;
    width: 350px;
    height: 35px;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.unactiveTabColor};
    margin-bottom: 16px;
`

export const RoleContainer = styled.fieldset`
    display: flex;
    border: none;
    border-top: 1px solid #ABB5BE;
    padding: 16px 0px;
    width: 350px;
    flex-wrap: wrap;
    gap: 7px;
    box-sizing: border-box;
`

export const Role = styled.label`
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 32px;
    box-sizing: border-box;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 15px 0px;
    cursor: pointer;

`

export const RoleInput = styled.input`
    display: none;
    &:checked + ${Role} {
    background: #6A9BFB;
  }
`

export const SubmitButton = styled.input`
    width: 350px;
    height: 35px;
    text-align: center;
    border: none;
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

export const Agreement = styled.span`
    color: #BDBDBD;
    font-size: 9px;
    display: block;
    text-align:center; 
`

export const AgreementLink = styled.a`
    color: ${(props) => props.theme.fontColorBlack};
    text-decoration: underline;
    &:visited {
        color: ${(props) => props.theme.fontColorBlack};
    }
`

export const AccountInfo = styled.span`
    font-size: 12px;
    color: ${(props) => props.theme.fontColorGrey};
    text-align: center;
    display: block;
`

export const AccountInfoButton = styled.button`
    color: #285FCB;
    border: none;
    padding: 0;
    background-color: inherit;
    cursor: pointer;
`

export const ValidationError = styled.span`
    display: block;
    margin: 0 auto;
    font-size: 12px;
    color: ${(props) => props.theme.errorColor};
    display: ${(props) => props.$error ? `block` : `none`};
`