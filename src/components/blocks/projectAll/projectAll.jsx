import {useState, useContext, useEffect} from "react";
import {UserContext} from "../../../context/user-context";
import ProjectCard from "../projectCard/projectCard.jsx";
import {GridContainer} from "./styles.js";

const ProjectAll = () => {
    const [token, setToken] = useContext(UserContext);
    const [projectList, setProjectList] = useState([]);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    function fetchProjects() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        fetch("http://localhost:8080/api/v1/task-type", requestOptions)
            .then(response => response.json())
            .then(
                (projectList) => {
                    setProjectList(projectList);
                    setLoaded(true)
                }
            )
            .catch(
                (error) => {
                    setLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return <div>Ошибка: {JSON.stringify(error)}</div>;
    } else if (!loaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <GridContainer>
                {projectList.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project_name={project.name}
                        description={project.description}
                    />
                ))}
            </GridContainer>
        );
    }
};

export default ProjectAll;