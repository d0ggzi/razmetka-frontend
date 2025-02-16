import {StyledBurger, SideBar, SideBarTop, CloseButton} from "./styles"
import {useState} from "react";
import {useAuth} from "../../../context/useAuth.jsx";
import DropdownList from "../../blocks/dropdownlist/dropdownList.jsx";
import {StyledList} from "../../blocks/dropdownlist/styles.js";
import {useNavigate} from "react-router-dom";

function Nav({setSelectedProject}) {
    const [sidebar, setSidebar] = useState(true);
    const {user, hasRole} = useAuth();

    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();

    return (
        <>
            <StyledBurger onClick={showSidebar}/>
            <SideBar $sidebar={sidebar}>
                <SideBarTop>
                    <CloseButton onClick={showSidebar}/>
                </SideBarTop>
                <DropdownList
                    title="Мои проекты"
                    items={[
                        {label: "Проект A"},
                        {label: "Проект Б"}
                    ]}
                    onSelect={setSelectedProject}
                />
                {hasRole(["admin"]) && <StyledList onClick={() => navigate("/project")}>Все проекты</StyledList>}
                {hasRole(["admin"]) && <StyledList onClick={() => navigate("/batch")}>Все пакеты</StyledList>}
                {hasRole(["admin"]) && <StyledList>Асессоры</StyledList>}
            </SideBar>
        </>
    )
}

export default Nav;