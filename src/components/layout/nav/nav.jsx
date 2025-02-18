import { StyledBurger, SideBar, SideBarTop, CloseButton } from "./styles";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth.jsx";
import DropdownList from "../../blocks/dropdownlist/dropdownList.jsx";
import { StyledList } from "../../blocks/dropdownlist/styles.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user-context.jsx";

function Nav({ setSelectedProjectName, setSelectedProjectId }) {
    const [sidebar, setSidebar] = useState(true);
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);
    const [token] = useContext(UserContext);
    const { hasRole } = useAuth();
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user?.task_type_access?.length) {
            fetchProjects();
        }
    }, [user]);

    const fetchUser = async () => {
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("http://dggz.me:8000/api/users/me", requestOptions);
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error("Ошибка загрузки пользователя:", error);
        }
    };

    const fetchProjects = async () => {
        if (!user?.task_type_access) return;

        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const fetchedProjects = await Promise.all(
                user.task_type_access.map(async (projectId) => {
                    const response = await fetch(`/api/v1/task-type/${projectId}`, requestOptions);
                    return response.json();
                })
            );

            setProjects(fetchedProjects);
        } catch (error) {
            console.error("Ошибка загрузки проектов:", error);
        }
    };

    function onSelectProjectItem(itemLabel, itemId) {
        setSelectedProjectName(itemLabel);
        setSelectedProjectId(itemId);
        navigate("/");
    }

    return (
        <>
            <StyledBurger onClick={showSidebar}/>
            <SideBar $sidebar={sidebar}>
                <SideBarTop>
                    <CloseButton onClick={showSidebar}/>
                </SideBarTop>
                <DropdownList
                    title="Мои проекты"
                    items={projects.map((project) => ({
                        name: project.name,
                        task_type_id: project.id,
                    }))}
                    onSelect={onSelectProjectItem}
                />
                <StyledList onClick={() => navigate("/project")}>Все проекты</StyledList>
                {hasRole(["admin"]) && <StyledList onClick={() => navigate("/batch")}>Все пакеты</StyledList>}
                {hasRole(["admin"]) && <StyledList>Асессоры</StyledList>}
            </SideBar>
            <h1 onClick={() => navigate("/")} style={{marginLeft: "20px"}}>1me.</h1>
        </>
    );
}

export default Nav;
