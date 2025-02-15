import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user-context";
import { Form, Title, TextInput, InputLabel, SubmitButton, AccountInfo, AccountInfoButton, ValidationError } from "../registration/styles.js";

const Login = ({setTab}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useContext(UserContext);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("http://dggz.me:8000/api/token", requestOptions);
    const data = await response.json();

    if ((!response.ok) && validateEmail(email)) {
      setError(true);
    } else {
      setToken(data.access_token);
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Title>Вход</Title>
        <InputLabel>E-mail</InputLabel>
        <TextInput 
          type='email' value={email} placeholder="Введите e-mail"
          onChange={(e) => setEmail(e.target.value)} required/>
        <InputLabel>Пароль</InputLabel>
        <TextInput 
          type='password' placeholder="Введите пароль (не менее 5 символов)" value={password}
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <SubmitButton type="submit" value="Войти" disabled={validateEmail(email) && password.length >= 5 ? false : true} />
        <ValidationError $error={error}>Неверный логин или пароль</ValidationError>
        <AccountInfo>Еще нет аккаунта? <AccountInfoButton onClick={() => setTab('registration')}>Зарегистрироваться</AccountInfoButton></AccountInfo>
    </Form>
  );
};

export default Login;