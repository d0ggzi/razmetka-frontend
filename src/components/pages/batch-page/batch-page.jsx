import Tabs from "../../blocks/tabs/tabs";
import {MainSection} from "./styles";
import BatchAll from "../../blocks/batchAll/batchAll.jsx";
import BatchAdd from "../../blocks/batchAdd/batchAdd.jsx";

function BatchPage(props) {
    const tabs = [
        {
            id: 1,
            name: 'Все пакеты',
            content: <BatchAll/>,
        },
        {
            id: 2,
            name: 'Добавление пакета',
            content: <BatchAdd/>,
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

export default BatchPage;