import Tabs from "../../blocks/tabs/tabs";
import {MainSection, ProjectHeader, ProjectName} from "./styles";

function MainPage(props) {

    const tabs = []
    return (
        <>
            <ProjectHeader>
                <ProjectName><strong>{props.selectedProject}</strong></ProjectName>
            </ProjectHeader>

            <MainSection>
                <Tabs {...props} tabs={tabs}/>
            </MainSection>
        </>
    );
}

export default MainPage;