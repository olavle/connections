import { FC } from "react";
import { IGameBoardWord } from "../types";
import styled from "styled-components";
import { BoardLine } from "../BoardLine";
import { BoardWord } from "../BoardWord";
import { useGameBoardContext } from "../GameBoardContext";

const StyledGameBoard = styled.div`
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  grid-auto-flow: row;
  gap: 1rem;
`;

interface IProps {}

export const WordGrid: FC<IProps> = () => {
  const { words } = useGameBoardContext();
  return (
    <StyledGameBoard>
      {words.map((word) => (
        <BoardWord key={word.word} boardWord={word} />
      ))}
    </StyledGameBoard>
  );
};
