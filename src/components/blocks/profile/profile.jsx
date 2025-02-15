import {useContext, useState, useEffect} from "react";
import {UserContext} from "../../../context/user-context";
import {useNavigate} from "react-router-dom";
import {
    InfoUpdateStatus,
    ProfileContainer,
    Form,
    Line,
    InputLabel,
    SideSection,
    TextInput,
    Role,
    RoleContainer,
    RoleInput,
    SubmitButton,
    LogoutButton,
    FormContainer
} from "./styles.js";

function Profile() {

    const [token, setToken] = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [infoUpdateStatus, setInfoUpdateStatus] = useState("");
    const navigate = useNavigate();


    // get user info for inputs
    function fetchUserInfo() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        // setLoading(true);
        // const response = await
        fetch("http://dggz.me:8000/api/users/me", requestOptions)
            .then(response => response.json())
            .then(
                (user) => {
                    setName(user.name);
                    setEmail(user.email);
                    setRole(user.role_name);
                    setLoaded(true)
                }
            )
            .catch(
                (error) => {
                    setLoaded(true);
                    setError(error);
                }
            )
    }

    // put new user info
    const updateUserInfo = async () => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email, password: password,
                name: name, role_name: role
            }),
        };

        const response = await fetch("http://dggz.me:8000/api/users/me", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setInfoUpdateStatus(data.detail);
        } else {
            setInfoUpdateStatus('Данные успешно обновлены!');
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserInfo()
    };

    useEffect(() => {
        fetchUserInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("awesomeLeadsToken");
        navigate('/login')
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateForm = () => {
        return (validateEmail(email) && password.length >= 5 &&
            name && role)
    }

    if (error) {
        return <div>Ошибка: {JSON.stringify(error)}</div>;
    } else if (!loaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <ProfileContainer>
                <Form onSubmit={handleSubmit}>
                    <FormContainer>
                        <SideSection>
                            <InputLabel>ФИО</InputLabel>
                            <TextInput onChange={(e) => setName(e.target.value)} type='text' value={name}
                                       placeholder="Введите ФИО"/>
                            <InputLabel>E-mail</InputLabel>
                            <TextInput onChange={(e) => setEmail(e.target.value)} type='email' value={email}
                                       placeholder="Введите e-mail"/>
                            <InputLabel>Пароль</InputLabel>
                            <TextInput onChange={(e) => setPassword(e.target.value)} type='password' value={password}
                                       placeholder="Придумайте пароль (не менее 5 символов)"/>
                        </SideSection>
                        <Line/>
                        <SideSection>
                            <InputLabel>Роль</InputLabel>
                            <RoleContainer>
                                <RoleInput type="radio" name="role" id="assessor" value="assessor" checked={role==="assessor"}
                                           onChange={(e) => setRole(e.target.value)}/>
                                <Role htmlFor="assessor">Асессор</Role>

                                <RoleInput type="radio" name="role" id="customer" value="customer" checked={role==="customer"}
                                           onChange={(e) => setRole(e.target.value)}/>
                                <Role htmlFor="customer">Заказчик</Role>

                                <RoleInput type="radio" name="role" id="expert" value="expert" checked={role==="expert"}
                                           onChange={(e) => setRole(e.target.value)}/>
                                <Role htmlFor="expert">Эксперт</Role>
                            </RoleContainer>
                        </SideSection>
                    </FormContainer>
                    <SubmitButton type="submit" value="Сохранить изменения" disabled={validateForm() ? false : true}/>
                </Form>
                <LogoutButton onClick={logout}>Выйти из аккаунта</LogoutButton>
                {infoUpdateStatus && <InfoUpdateStatus>{infoUpdateStatus}</InfoUpdateStatus>}
            </ProfileContainer>
        )
    }

}

export default Profile;