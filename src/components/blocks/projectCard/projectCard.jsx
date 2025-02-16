import React from "react";
import { Card, Title, Text } from "./styles";

const ProjectCard = ({ project_name, description }) => {
    return (
        <Card>
            <Title>{project_name}</Title>
            <Text><strong>Описание:</strong> {description}</Text>
        </Card>
    );
};

export default ProjectCard;
