import styled from "styled-components";

export const Card = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin: 10px;
    width: 300px;
`;

export const Title = styled.h2`
    font-size: 1.2em;
    margin-bottom: 8px;
    color: #333;
`;

export const Text = styled.p`
    font-size: 1em;
    margin: 4px 0;
    color: #555;
`;

export const SelectButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    width: 100%;
    font-size: 1em;
    text-align: center;

    &:hover {
        background-color: #0056b3;
    }
`;
