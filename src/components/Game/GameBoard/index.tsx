import { FC } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";
import { InfoSection } from "../InfoSection";

interface IProps {}

const StyledGameBoard = styled.div``;

export const GameBoard: FC<IProps> = () => {
  const { words } = useGameBoardContext();

  const wordColumns = R.splitEvery(4, words);

  return (
    <StyledGameBoard>
      <WordGrid wordColumns={wordColumns} />
      <InfoSection />
    </StyledGameBoard>
  );
};
