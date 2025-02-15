import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../../context/user-context";
import {
    Agreement,
    AgreementLink,
    Form,
    InputLabel,
    Role,
    RoleContainer,
    RoleInput,
    SubmitButton,
    TextInput,
    Title,
    AccountInfo,
    AccountInfoButton
} from "./styles.js";

const Register = ({setTab}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [role, setRole] = useState("");
    const [, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email, password: password,
                name: name, role_name: role
            }),
        };

        const response = await fetch("http://dggz.me:8000/api/users", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            console.log(data.detail);
        } else {
            setToken(data.access_token);
            navigate('/');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitRegistration();
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateForm = () => {
        return (validateEmail(email) && password.length >= 5 &&
            password === confirmationPassword && name && role)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Title>Регистрация</Title>
            <InputLabel>ФИО</InputLabel>
            <TextInput onChange={(e) => setName(e.target.value)} type='text' placeholder="Введите ФИО"/>
            <InputLabel>E-mail</InputLabel>
            <TextInput onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Введите e-mail"/>
            <InputLabel>Пароль</InputLabel>
            <TextInput onChange={(e) => setPassword(e.target.value)} type='password'
                       placeholder="Придумайте пароль (не менее 5 символов)"/>
            <InputLabel>Подтверждение пароля</InputLabel>
            <TextInput onChange={(e) => setConfirmationPassword(e.target.value)} type='password'
                       placeholder="Повторите пароль"/>
            <InputLabel>Роль</InputLabel>
            <RoleContainer>
                <RoleInput type="radio" name="role" id="assessor" value="assessor"
                           onChange={(e) => setRole(e.target.value)}/>
                <Role htmlFor="assessor">Асессор</Role>

                <RoleInput type="radio" name="role" id="customer" value="customer"
                           onChange={(e) => setRole(e.target.value)}/>
                <Role htmlFor="customer">Заказчик</Role>

                <RoleInput type="radio" name="role" id="expert" value="expert"
                           onChange={(e) => setRole(e.target.value)}/>
                <Role htmlFor="expert">Эксперт</Role>
            </RoleContainer>

            <SubmitButton type="submit" value="Зарегистрироваться" disabled={validateForm() ? false : true}/>
            <Agreement>
                Регистрируясь, вы принимаете условия <AgreementLink href="">пользовательского соглашения</AgreementLink>
            </Agreement>

            <AccountInfo>Уже есть аккуант? <AccountInfoButton onClick={() => setTab('login')}>Войти</AccountInfoButton></AccountInfo>
        </Form>
    );
};

export default Register;