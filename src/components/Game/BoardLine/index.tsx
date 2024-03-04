import styled from "styled-components";
import { IGameBoardWord } from "../types";
import { FC, useContext } from "react";
import { BoardWord } from "../BoardWord";

interface IProps {
  words: IGameBoardWord[];
}

const StyledBoardLine = styled.div``;

export const BoardLine: FC<IProps> = ({ words }) => {
  return (
    <StyledBoardLine>
      {words.map((word) => (
        <BoardWord key={word.word} boardWord={word} />
      ))}
    </StyledBoardLine>
  );
};
