import { FC } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";
import { InfoSection } from "../InfoSection";

interface IProps {}

const StyledGameBoard = styled.div``;

export const GameBoard: FC<IProps> = () => {
  return (
    <StyledGameBoard>
      <WordGrid />
      <InfoSection />
    </StyledGameBoard>
  );
};
