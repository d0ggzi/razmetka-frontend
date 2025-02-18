import {Form, FormContainer, InfoCreateStatus, NameInput, SideSection, SubmitButton, TextInput} from "./styles.js";
import {useContext, useState} from "react";
import {UserContext} from "../../../context/user-context.jsx";
import {InputLabel} from "../profile/styles.js";

const ProjectAdd = () => {
    const [newProjectName, setNewProjectName] = useState("")
    const [newProjectDescription, setNewProjectDescription] = useState("")
    const [newProjectMetadata, setNewProjectMetadata] = useState("")
    const [token, setToken] = useContext(UserContext);
    const [infoCreateStatus, setInfoCreateStatus] = useState("");

    async function createProject() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newProjectName,
                description: newProjectDescription,
                annotation_metadata: newProjectMetadata.length!==0 ? JSON.parse(newProjectMetadata) : null
            }),
        };
        const response = await fetch("http://localhost:8080/api/v1/task-type", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setInfoCreateStatus(data.detail);
        } else {
            setInfoCreateStatus('Проект успешно добавлен!');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProject();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormContainer>
                    <SideSection>
                        <InputLabel>Название</InputLabel>
                        <NameInput onChange={(e) => setNewProjectName(e.target.value)} type='text'
                                   value={newProjectName}
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter" && !e.shiftKey) {
                                           e.preventDefault();
                                       }
                                   }}
                                   placeholder="Введите имя нового проекта"/>
                        <InputLabel>Описание</InputLabel>
                        <TextInput onChange={(e) => setNewProjectDescription(e.target.value)} type='textarea'
                                   value={newProjectDescription}
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter" && !e.shiftKey) {
                                           e.preventDefault();
                                       }
                                   }}
                                   placeholder="Введите описание нового проекта"/>
                        <InputLabel>Метаданные</InputLabel>
                        <TextInput onChange={(e) => setNewProjectMetadata(e.target.value)} type='textarea'
                                   value={newProjectMetadata}
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter" && !e.shiftKey) {
                                           e.preventDefault();
                                       }
                                   }}
                                   placeholder="Введите метаданные нового проекта в формате JSON"/>
                    </SideSection>
                </FormContainer>
                <SubmitButton type="submit" value="Добавить проект"
                              disabled={newProjectName.length === 0 || newProjectDescription.length === 0}/>
                {infoCreateStatus && <InfoCreateStatus>{infoCreateStatus}</InfoCreateStatus>}
            </Form>
        </>
    )
}

export default ProjectAdd;