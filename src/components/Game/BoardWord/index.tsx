import { FC } from "react";
import styled from "styled-components";
import { IGameBoardWord } from "../types";
import { useGameBoardContext } from "../GameBoardContext";

interface IProps {
  boardWord: IGameBoardWord;
}

const StyledBoardWord = styled.div<{ $isSelected: boolean }>`
  padding: 1rem;
  user-select: none;
  text-align: center;
  box-shadow: 0 0 0 1px;

  ${({ $isSelected }) => $isSelected && "background-color: #1eff00;"}
`;

export const BoardWord: FC<IProps> = ({ boardWord }) => {
  const { word } = boardWord;
  const { toggleWordSelect } = useGameBoardContext();

  const isSelected = boardWord.isSelected;

  return (
    <StyledBoardWord
      $isSelected={isSelected}
      onClick={() => toggleWordSelect(word)}
    >
      {word}
    </StyledBoardWord>
  );
};
