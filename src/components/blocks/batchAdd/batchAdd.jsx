import {Form, FormContainer, InfoCreateStatus, SubmitButton, TextInput} from "./styles.js";
import {useContext, useState} from "react";
import {UserContext} from "../../../context/user-context.jsx";

const BatchAdd = () => {
    const [newBatch, setNewBatch] = useState("")
    const [token, setToken] = useContext(UserContext);
    const [infoCreateStatus, setInfoCreateStatus] = useState("");

    async function createBatch() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBatch),
        };
        const response = await fetch("http://localhost:8080/api/v1/batch", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setInfoCreateStatus(data.detail);
        } else {
            setInfoCreateStatus('Пакет успешно добавлен!');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBatch();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormContainer>
                    <TextInput onChange={(e) => setNewBatch(e.target.value)} type='textarea' value={newBatch}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter" && !e.shiftKey) {
                                       e.preventDefault();
                                   }
                               }}
                               placeholder="Введите новый батч в формате JSON"/>
                </FormContainer>
                <SubmitButton type="submit" value="Добавить пакет" disabled={newBatch.length === 0}/>
                {infoCreateStatus && <InfoCreateStatus>{infoCreateStatus}</InfoCreateStatus>}
            </Form>
        </>
    )
}

export default BatchAdd;