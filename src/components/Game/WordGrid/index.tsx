import { FC } from "react";
import styled from "styled-components";
import { BoardWord } from "../BoardWord";
import { useGameBoardContext } from "../GameBoardContext";
import { IGameBoardWord } from "../types";

interface IStyledGameBoardProps {
  $size: number;
}

const StyledGameBoard = styled.div<IStyledGameBoardProps>`
  display: grid;
  grid-template: ${({ $size }) => `repeat(${$size}, 1fr) / repeat(4, 1fr)`};
  grid-auto-flow: row;
  gap: 1vw;
`;

interface IProps {
  words: IGameBoardWord[];
  size?: number;
}

export const WordGrid: FC<IProps> = ({ words, size = 4 }) => {
  return (
    <StyledGameBoard $size={size}>
      {words.map((word) => (
        <BoardWord key={word.word} boardWord={word} />
      ))}
    </StyledGameBoard>
  );
};
