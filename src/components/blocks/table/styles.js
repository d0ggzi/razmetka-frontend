import styled from "styled-components";

export const Container = styled.div`
  font-family: sans-serif;
  position: relative;
  width: 80vw;
  margin: 30px auto;
  color: ${(props) => props.theme.fontColorGrey};
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const TableStyled = styled.table`
  width: 100%;
  padding: 1em;
  margin: 20px 0;
  border-collapse: collapse;
  box-shadow: 0 1px 2px 0 ${(props) => props.theme.headerColor};
`;

export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.headerColor};
  font-size: 16px;
`;

export const TableRow = styled.tr`
  height: 50px;
  &:nth-child(even) {
    background-color: #e0e0e0;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  background-color: ${(props) => props.theme.headerColor};
  color: ${(props) => props.theme.fontColorBlack};
`;

export const TableCell = styled.td`
  text-align: left;
  padding: 8px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  height: 40px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.headerColor};
  background-color: ${(props) => props.theme.headerColor};
  color: #6A9BFB;
  cursor: pointer;
  padding: 10px 15px;

  &:hover {
    background: ${(props) => props.theme.headerColor};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
