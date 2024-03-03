import { FC } from "react";
import { IGameBoardWord } from "../types";
import * as R from "ramda";
import { BoardLine } from "../BoardLine";
import styled from "styled-components";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";

interface IProps {}

const StyledGameBoard = styled.div``;

export const GameBoard: FC<IProps> = () => {
  const { words } = useGameBoardContext();

  const wordColumns = R.splitEvery(4, words);

  return (
    <StyledGameBoard>
      <WordGrid wordColumns={wordColumns} />
    </StyledGameBoard>
  );
};
