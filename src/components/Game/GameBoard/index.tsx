import { FC } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";
import { InfoSection } from "../InfoSection";
import { CorrectWords } from "../CorrectWords";
import { BoardWords } from "../BoardWords";

interface IProps {}

const StyledGameBoard = styled.div``;

export const GameBoard: FC<IProps> = () => {
  return (
    <StyledGameBoard>
      <CorrectWords />
      <BoardWords />
      <InfoSection />
    </StyledGameBoard>
  );
};
