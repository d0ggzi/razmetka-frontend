import Tabs from "../../blocks/tabs/tabs";
import {MainSection} from "./styles";
import ProjectAll from "../../blocks/projectAll/projectAll.jsx";
import ProjectAdd from "../../blocks/projectAdd/projectAdd.jsx";
import {useAuth} from "../../../context/useAuth.jsx";

function ProjectPage(props) {
    const { hasRole } = useAuth();

    const tabs = [
        {
            id: 1,
            name: "Все проекты",
            content: <ProjectAll />,
        },
    ];

    if (hasRole(["admin"])) {
        tabs.push({
            id: 2,
            name: "Добавление проекта",
            content: <ProjectAdd />,
        });
    }
    return (
        <>
            <MainSection>
                <Tabs {...props} tabs={tabs}/>
            </MainSection>
        </>
    );
}

export default ProjectPage;