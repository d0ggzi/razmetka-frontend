import React from "react";
import {
    Container,
    TableContainer,
    TableStyled,
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    PaginationWrapper,
    PageButton
} from "./styles";

const Table = ({tableHead, data, isLoading, currentPage, hasNextPage, onPageChange, error}) => {
    return (
        <Container>
            <TableContainer>
                <TableStyled>
                    <TableHead>
                        <TableRow>
                            {Object.values(tableHead).map((title, index) => (
                                <TableHeader key={index}>{title}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <tbody>
                    {error ? (
                        <TableRow>
                            <TableCell colSpan={Object.keys(tableHead).length} style={{color: "red"}}>
                                {error}
                            </TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={Object.keys(tableHead).length}>Нет данных</TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, index) => (
                            <TableRow key={index}>
                                {Object.keys(tableHead).map((key, i) => (
                                    <TableCell key={i}>
                                        {typeof row[key] === "boolean"
                                            ? row[key] ? "✓" : "✗"
                                            : row[key] || "—"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                    </tbody>
                </TableStyled>
            </TableContainer>

            <PaginationWrapper>
                <PageButton
                    disabled={currentPage === 0}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    ← Назад
                </PageButton>
                <span>Страница {currentPage + 1}</span>
                <PageButton
                    disabled={!hasNextPage}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Вперед →
                </PageButton>
            </PaginationWrapper>
        </Container>
    );
};

export default Table;
