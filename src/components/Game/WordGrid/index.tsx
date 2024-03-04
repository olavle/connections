import { FC } from "react";
import { IGameBoardWord } from "../types";
import styled from "styled-components";
import { BoardLine } from "../BoardLine";

const StyledGameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

interface IProps {
  wordColumns: IGameBoardWord[][];
}

export const WordGrid: FC<IProps> = ({ wordColumns }) => (
  <StyledGameBoard>
    {wordColumns.map((line, i) => (
      <BoardLine key={i} words={line} />
    ))}
  </StyledGameBoard>
);
