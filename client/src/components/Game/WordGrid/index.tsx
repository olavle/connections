import { FC } from "react";
import styled from "styled-components";
import { BoardWord } from "../BoardWord";
import { useGameBoardContext } from "../GameBoardContext";
import { IGameBoardWord } from "../types";

interface IStyledGameBoardProps {
  $rows: number;
}

const StyledGameBoard = styled.div<IStyledGameBoardProps>`
  display: grid;
  grid-template: ${({ $rows }) => `repeat(${$rows}, 1fr) / repeat(4, 1fr)`};
  grid-auto-flow: row;
  gap: 1vw;
`;

interface IProps {
  words: IGameBoardWord[];
  rows?: number;
}

export const WordGrid: FC<IProps> = ({ words, rows = 4 }) => {
  return (
    <StyledGameBoard $rows={rows}>
      {words.map((word) => (
        <BoardWord key={word.word} boardWord={word} />
      ))}
    </StyledGameBoard>
  );
};
