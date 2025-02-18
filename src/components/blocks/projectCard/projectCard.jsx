import React from "react";
import { Card, Title, Text, SelectButton } from "./styles";

const ProjectCard = ({ project_name, description, onSelect }) => {
    return (
        <Card>
            <Title>{project_name}</Title>
            <Text><strong>Описание:</strong> {description}</Text>
            <SelectButton onClick={onSelect}>Выбрать</SelectButton>
        </Card>
    );
};

export default ProjectCard;
