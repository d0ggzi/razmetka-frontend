import { Form, FormContainer, InfoCreateStatus, SubmitButton, TextInput, Select } from "./styles.js";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user-context.jsx";

const BatchAdd = () => {
    const [newBatch, setNewBatch] = useState("");
    const [token] = useContext(UserContext);
    const [infoCreateStatus, setInfoCreateStatus] = useState("");
    const [taskTypes, setTaskTypes] = useState([]); // Список проектов (task_type)
    const [selectedTaskType, setSelectedTaskType] = useState(""); // Выбранный проект

    useEffect(() => {
        async function fetchTaskTypes() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            try {
                const response = await fetch("/api/v1/task-type", requestOptions);
                const result = await response.json();

                if (response.ok) {
                    setTaskTypes(result);
                    if (result.length > 0) {
                        setSelectedTaskType(result[0].id); // Устанавливаем первый проект по умолчанию
                    }
                } else {
                    throw new Error("Ошибка загрузки проектов");
                }
            } catch (error) {
                console.error("Ошибка при получении task_type:", error);
            }
        }

        fetchTaskTypes();
    }, [token]);

    async function createBatch() {
        try {
            let batchData = JSON.parse(newBatch);

            // Обновляем или добавляем `task_type` в JSON
            batchData.task_type = selectedTaskType;

            const requestOptions = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(batchData),
            };
            const response = await fetch("/api/v1/batch", requestOptions);

            if (!response.ok) {
                setInfoCreateStatus("Произошла ошибка, перепроверьте данные");
            } else {
                setInfoCreateStatus("Пакет успешно добавлен!");
                setNewBatch(""); // Очищаем поле после успешного добавления
            }
        } catch (error) {
            setInfoCreateStatus("Ошибка: Неправильный JSON");
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
                    <Select
                        value={selectedTaskType}
                        onChange={(e) => setSelectedTaskType(e.target.value)}
                    >
                        {taskTypes.map((task) => (
                            <option key={task.id} value={task.id}>
                                {task.name}
                            </option>
                        ))}
                    </Select>
                    <TextInput
                        onChange={(e) => setNewBatch(e.target.value)}
                        value={newBatch}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Введите новый батч в формате JSON"
                    />
                </FormContainer>
                <SubmitButton type="submit" value="Добавить пакет" disabled={newBatch.length === 0} />
                {infoCreateStatus && <InfoCreateStatus>{infoCreateStatus}</InfoCreateStatus>}
            </Form>
        </>
    );
};

export default BatchAdd;
