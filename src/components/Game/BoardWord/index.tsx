import { FC } from "react";
import styled, { css } from "styled-components";
import { IGameBoardWord } from "../types";
import { useGameBoardContext } from "../GameBoardContext";
import { useGetWindowWidth } from "../../../hooks/useGetWindowWidth";

interface IProps {
  boardWord: IGameBoardWord;
}

interface IStyledBoardWordProps {
  $isSelected: boolean;
  $isGuessedCorrect: boolean | undefined;
  $isMobile: boolean;
}

const StyledBoardWord = styled.div<IStyledBoardWordProps>`
  padding: 1rem;
  user-select: none;
  text-align: center;
  box-shadow: 0 0 0 1px;

  ${({ $isSelected, $isGuessedCorrect, $isMobile }) => css`
    font-size: ${$isMobile && "0.9rem"};
    background-color: ${() => {
      if ($isGuessedCorrect) {
        return "#1eff00";
      }
      if ($isSelected) {
        return "#fffc35";
      }
    }};
  `}
`;

export const BoardWord: FC<IProps> = ({ boardWord }) => {
  const { word, isGuessedCorrect } = boardWord;
  const { toggleWordSelect } = useGameBoardContext();

  const { isMobile } = useGetWindowWidth();

  const isSelected = boardWord.isSelected;

  return (
    <StyledBoardWord
      $isSelected={isSelected}
      $isGuessedCorrect={isGuessedCorrect}
      $isMobile={isMobile}
      onClick={() => toggleWordSelect(word)}
    >
      {word}
    </StyledBoardWord>
  );
};
