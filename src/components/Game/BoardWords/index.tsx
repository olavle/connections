import styled from "styled-components";
import { BoardWord } from "../BoardWord";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";

const StyledBoardWords = styled.div`
  margin-bottom: 1rem;
`;

export const BoardWords = () => {
  const { words } = useGameBoardContext();

  if (!words.length) {
    return null;
  }

  return (
    <StyledBoardWords>
      <WordGrid words={words} rows={words.length / 4} />
    </StyledBoardWords>
  );
};
