import Tabs from "../../blocks/tabs/tabs";
import {MainSection} from "./styles";
import ProjectAll from "../../blocks/projectAll/projectAll.jsx";
import BatchAdd from "../../blocks/batchAdd/batchAdd.jsx";

function ProjectPage(props) {
    const tabs = [
        {
            id: 1,
            name: 'Все проекты',
            content: <ProjectAll/>,
        },
        {
            id: 2,
            name: 'Добавление проекта',
            content: <BatchAdd/>, //todo
        }
    ]
    return (
        <>
            <MainSection>
                <Tabs {...props} tabs={tabs}/>
            </MainSection>
        </>
    );
}

export default ProjectPage;