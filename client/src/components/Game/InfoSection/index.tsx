import styled from "styled-components";
import { SubmitSlider } from "../SubmitSlider";
import { Button } from "../../ui/Button";
import { useGameBoardContext } from "../GameBoardContext";
import { WrongAnswerMessage } from "../WrongAnswerMessage";

const StyledInfoSection = styled.div`
  padding: 1rem;
`;

export const InfoSection = () => {
  const { checkIsCorrectWords, correctWords, words } = useGameBoardContext();

  const handleCheckResult = () => {
    checkIsCorrectWords();
  };

  const allCorrect = !words.length && !!correctWords.length;

  const message = allCorrect ? "All correct!" : "Check";

  return (
    <StyledInfoSection>
      <Button
        action={handleCheckResult}
        disabled={allCorrect}
        color={allCorrect ? "success" : "default"}
        fullWidth
      >
        {message}
      </Button>
      <WrongAnswerMessage />
    </StyledInfoSection>
  );
};
