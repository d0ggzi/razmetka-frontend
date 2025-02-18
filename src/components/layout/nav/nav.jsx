import {StyledBurger, SideBar, SideBarTop, CloseButton} from "./styles"
import {useState} from "react";
import {useAuth} from "../../../context/useAuth.jsx";
import DropdownList from "../../blocks/dropdownlist/dropdownList.jsx";
import {StyledList} from "../../blocks/dropdownlist/styles.js";
import {useNavigate} from "react-router-dom";

function Nav({setSelectedProjectName, setSelectedProjectId}) {
    const [sidebar, setSidebar] = useState(true);
    const {user, hasRole} = useAuth();

    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();

    function onSelectProjectItem ( itemLabel, itemId ) {
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
                    items={[
                        {name: "Search", task_type_id: "123"},
                        {name: "Matching", task_type_id: "321"}
                    ]}
                    onSelect={onSelectProjectItem}
                />
                {<StyledList onClick={() => navigate("/project")}>Все проекты</StyledList>}
                {hasRole(["admin"]) && <StyledList onClick={() => navigate("/batch")}>Все пакеты</StyledList>}
                {hasRole(["admin"]) && <StyledList>Асессоры</StyledList>}
            </SideBar>
        </>
    )
}

export default Nav;