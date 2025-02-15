import { useState } from "react";
import { LoginWrapper } from "./styles";
import Login from "../../blocks/login/login";
import Register from "../../blocks/registration/register";
function LoginPage (props){
    const [tab, setTab] = useState('login');
  return (
    <LoginWrapper>
        {tab === 'login' ? <Login setTab={setTab}/> : <Register setTab={setTab}/>}
    </LoginWrapper>
  );
}

export default LoginPage;