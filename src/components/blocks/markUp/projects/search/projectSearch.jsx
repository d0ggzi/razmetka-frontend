import {useState, useEffect} from "react";
import {
    Container,
    Sidebar,
    Content,
    LabelGroup,
    Label,
    StyledCard,
    StyledButton,
    StyledImage,
    StyledLink,
    StyledCheckbox,
    StyledRadio,
    CarouselControls, InfoContainer, PhotoContainer
} from "./styles.js";

function ProjectSearch({projectId}) {
    const storageKeyTask = `task_search_${projectId}`;
    const storageKeyLabels = `labels_search_${projectId}`;

    const [task, setTask] = useState(null);
    const [labels, setLabels] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const fetchTaskData = async (forceUpdate = false) => {
        try {
            const storedTask = localStorage.getItem(storageKeyTask);
            const storedLabels = localStorage.getItem(storageKeyLabels);

            if (storedTask && storedLabels && !forceUpdate) {
                setTask(JSON.parse(storedTask));
                setLabels(JSON.parse(storedLabels));
                setLoading(false);
            } else {
                const taskRes = await fetch(`http://localhost:8080/api/v1/task?task_type_id=${projectId}`);
                const taskData = await taskRes.json();

                const labelsRes = await fetch(`http://localhost:8080/api/v1/task-type/${projectId}`);
                const labelsData = await labelsRes.json();

                setTask(taskData);
                setLabels(labelsData.annotation_metadata);

                localStorage.setItem(`task_${projectId}`, JSON.stringify(taskData));
                localStorage.setItem(`labels_${projectId}`, JSON.stringify(labelsData.annotation_metadata));

                setSelectedRadio("");
                setSelectedCheckboxes([]);
                setLoading(false);
            }
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
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
            is_honeypot: task.is_honeypot,
            metadata: task.metadata,
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/answer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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

    const renderPhotos = () => {
        if (!task.parameters.url_photo) return null;

        const photos = Array.isArray(task.parameters.url_photo) ? task.parameters.url_photo : [task.parameters.url_photo];
        const isSinglePhoto = photos.length === 1;

        return (
            <PhotoContainer>
                <StyledImage src={photos[currentPhotoIndex]} alt="Фото товара"/>
                <CarouselControls>
                    <button
                        disabled={isSinglePhoto}
                        onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
                    >
                        ❮
                    </button>
                    <button
                        disabled={isSinglePhoto}
                        onClick={() => setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
                    >
                        ❯
                    </button>
                </CarouselControls>
            </PhotoContainer>
        );
    };


    if (loading) return <p>Загрузка...</p>;
    if (!task) return <p>Задание не найдено</p>;

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
                        <h2>{task.parameters.title}</h2>
                        <br/>
                        <p><strong>Описание:</strong> {task.parameters.description}</p>
                        <div>
                            <StyledLink href={task.parameters.url} target="_blank">
                                Открыть ссылку
                            </StyledLink>
                        </div>
                    </StyledCard>
                </InfoContainer>

                {renderPhotos()}
            </Content>
        </Container>
    );
}

export default ProjectSearch;
