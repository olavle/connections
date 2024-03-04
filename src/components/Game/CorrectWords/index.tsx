import styled from "styled-components";
import { BoardWord } from "../BoardWord";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";

const StyledCorrectWords = styled.div`
  margin-bottom: 1rem;
`;

export const CorrectWords = () => {
  const { correctWords } = useGameBoardContext();

  if (!correctWords.length) {
    return null;
  }

  return (
    <StyledCorrectWords>
      <WordGrid words={correctWords} size={correctWords.length / 4} />
    </StyledCorrectWords>
  );
};
