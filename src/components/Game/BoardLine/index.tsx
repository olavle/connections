import styled from "styled-components";
import { IGameBoardWord } from "../types";
import { FC, useContext } from "react";
import { BoardWord } from "../BoardWord";

interface IProps {
  words: IGameBoardWord[];
}

const StyledBoardLine = styled.div`
  display: grid;
  grid-template-rows: repeat(4) auto;
  row-gap: 1rem;
`;

export const BoardLine: FC<IProps> = ({ words }) => {
  return (
    <StyledBoardLine>
      {words.map((word) => (
        <BoardWord key={word.word} boardWord={word} />
      ))}
    </StyledBoardLine>
  );
};
