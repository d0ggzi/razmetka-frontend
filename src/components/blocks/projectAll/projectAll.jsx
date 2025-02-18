import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/user-context";
import { useAuth } from "../../../context/useAuth.jsx";
import ProjectCard from "../projectCard/projectCard.jsx";
import { GridContainer } from "./styles.js";

const ProjectAll = () => {
    const [token, setToken] = useContext(UserContext);
    const { user } = useAuth();
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
        fetch("/api/v1/task-type", requestOptions)
            .then(response => response.json())
            .then(
                (projectList) => {
                    setProjectList(projectList);
                    setLoaded(true);
                }
            )
            .catch(
                (error) => {
                    setLoaded(true);
                    setError(error);
                }
            );
    }

    function fetchUser() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        return fetch("http://dggz.me:8000/api/users/me", requestOptions)
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error("Ошибка при получении пользователя:", error);
            });
    }

    async function handleSelectProject(projectId) {
        try {
            const updatedUser = await fetchUser();
            if (!updatedUser) return;

            const updatedTaskTypeAccess = [...(updatedUser.task_type_access || []), projectId];

            console.log(updatedTaskTypeAccess)

            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task_type_access: updatedTaskTypeAccess }),
            };

            fetch("http://dggz.me:8000/api/users/me", requestOptions)
                .then(response => response.json())
                .then((data) => {
                    console.log("Проект добавлен:", data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Ошибка при обновлении доступа:", error);
                });
        } catch (error) {
            console.error("Ошибка при обновлении проекта:", error);
        }
    }

    useEffect(() => {
        fetchProjects();
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
                        onSelect={() => handleSelectProject(project.id)}
                    />
                ))}
            </GridContainer>
        );
    }
};

export default ProjectAll;
