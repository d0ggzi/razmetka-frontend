import styled from "styled-components"

export const ProfileContainer = styled.div`
    padding: 54px 110px;
    display: flex;
    flex-direction: column;
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 54px;
`
export const Line = styled.div`
    border-right: 1px solid #ABB5BE;
`
export const SideSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
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

export const InfoUpdateStatus = styled.span`
    display: block;
    margin: 0 auto;
    font-size: 12px;
`

export const LogoutButton = styled.button`
    border: none;
    background-color: inherit;
    font-size: 14px;
    color: #6A9BFB;
    margin: 0 auto;
    cursor: pointer;
`