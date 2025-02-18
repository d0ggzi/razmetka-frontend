import {useState, useEffect, useContext} from "react";
import {
    Container,
    Sidebar,
    Content,
    InfoContainer,
    LabelGroup,
    Label,
    StyledCard,
    StyledButton,
    StyledImage,
    StyledLink,
    StyledCheckbox,
    StyledRadio
} from "./styles";
import {UserContext} from "../../../../../context/user-context.jsx";

function ProjectMatching({projectId}) {
    const storageKeyTask = `task_matching_${projectId}`;
    const storageKeyLabels = `labels_matching_${projectId}`;

    const [task, setTask] = useState(null);
    const [labels, setLabels] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noTasks, setNoTasks] = useState(false);
    const [token, setToken] = useContext(UserContext);


    const fetchTaskData = async (forceUpdate = false) => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const storedTask = localStorage.getItem(storageKeyTask);
            const storedLabels = localStorage.getItem(storageKeyLabels);

            if (storedTask && storedLabels && !forceUpdate) {
                setTask(JSON.parse(storedTask));
                setLabels(JSON.parse(storedLabels));
                setLoading(false);
            } else {
                const taskRes = await fetch(`/api/v1/task?project=${projectId}`, requestOptions);

                if (taskRes.status === 204) {
                    setNoTasks(true);
                    setTask(null);
                    setLoading(false);
                    return;
                }

                const taskData = await taskRes.json();

                const labelsRes = await fetch(`/api/v1/task-type/${projectId}`, requestOptions);
                const labelsData = await labelsRes.json();

                setTask(taskData);
                setLabels(labelsData.annotation_metadata);
                setNoTasks(false);

                localStorage.setItem(storageKeyTask, JSON.stringify(taskData));
                localStorage.setItem(storageKeyLabels, JSON.stringify(labelsData.annotation_metadata));

                setSelectedRadio("");
                setSelectedCheckboxes([]);
                setLoading(false);
            }
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            setNoTasks(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaskData();
    }, [projectId]);

    const handleRadioChange = (value) => {
        setSelectedRadio(value);
    };

    const handleCheckboxChange = (value) => {
        setSelectedCheckboxes((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleSubmit = async () => {
        const payload = {
            task_id: task.id,
            answer: {
                radio_button: selectedRadio,
                check_box: selectedCheckboxes,
            },
            metadata: task.metadata,
        };

        try {
            const response = await fetch("/api/v1/answer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                localStorage.removeItem(storageKeyTask);
                localStorage.removeItem(storageKeyLabels);
                fetchTaskData(true);
            }
        } catch (error) {
            console.error("Ошибка отправки данных:", error);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (noTasks) return <p>Нет доступных задач для данного проекта</p>;

    return (
        <Container>
            <Sidebar>
                {labels?.radio_button && (
                    <LabelGroup>
                        <h3>Оценка</h3>
                        {Object.entries(labels.radio_button).map(([key, label]) => (
                            <Label key={key}>
                                <StyledRadio
                                    name="radio_button"
                                    value={key}
                                    checked={selectedRadio === key}
                                    onChange={() => handleRadioChange(key)}
                                />
                                {label}
                            </Label>
                        ))}
                    </LabelGroup>
                )}

                {labels?.check_box && (
                    <LabelGroup>
                        <h3>Дополнительные метки</h3>
                        {Object.entries(labels.check_box).map(([key, label]) => (
                            <Label key={key}>
                                <StyledCheckbox
                                    checked={selectedCheckboxes.includes(key)}
                                    onChange={() => handleCheckboxChange(key)}
                                />
                                {label}
                            </Label>
                        ))}
                    </LabelGroup>
                )}

                <StyledButton onClick={handleSubmit}>Отправить</StyledButton>
            </Sidebar>

            <Content>
                <InfoContainer>
                    <StyledCard>
                        <h2>{task.parameters.title1}</h2>
                        <br/>
                        <p><strong>Описание:</strong> {task.parameters.description1}</p>
                        <StyledImage src={task.parameters.url_photo1} alt="Фото товара 1"/>
                        <div>
                            <StyledLink href={task.parameters.url1} target="_blank">
                                Открыть ссылку
                            </StyledLink>
                        </div>
                    </StyledCard>
                </InfoContainer>

                <InfoContainer>
                    <StyledCard>
                        <h2>{task.parameters.title2}</h2>
                        <br/>
                        <p><strong>Описание:</strong> {task.parameters.description2}</p>
                        <StyledImage src={task.parameters.url_photo2} alt="Фото товара 2"/>
                        <div>
                            <StyledLink href={task.parameters.url2} target="_blank">
                                Открыть ссылку
                            </StyledLink>
                        </div>
                    </StyledCard>
                </InfoContainer>
            </Content>
        </Container>
    );
}

export default ProjectMatching;
