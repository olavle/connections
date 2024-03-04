import { FC } from "react";
import styled, { css } from "styled-components";
import { IGameBoardWord } from "../types";
import { useGameBoardContext } from "../GameBoardContext";
import { useGetWindowWidth } from "../../../hooks/useGetWindowWidth";
import { colorPick } from "../../ui/color";

interface IProps {
  boardWord: IGameBoardWord;
}

interface IStyledBoardWordProps {
  $isSelected: boolean;
  $isGuessedCorrect: boolean | undefined;
  $isMobile: boolean;
}

const mobileFontStyle = css`
  padding: 3vw;
  font-size: 4vw;
`;

const StyledBoardWord = styled.div<IStyledBoardWordProps>`
  user-select: none;
  text-align: center;
  box-shadow: 0 0 0 1px;
  background-color: ${colorPick.blue};
  color: white;
  padding: 1.2rem;
  font-size: 2rem;

  ${({ $isSelected, $isGuessedCorrect, $isMobile }) => css`
    font-size: ${$isMobile && "0.9rem"};
    ${() => {
      if ($isMobile) {
        return mobileFontStyle;
      }
    }}
    ${() => {
      if ($isGuessedCorrect) {
        return css`
          background-color: #1eff00;
          color: black;
        `;
      }
      if ($isSelected) {
        return css`
          background-color: #fffc35;
          color: black;
        `;
      }
    }};
  `};
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
