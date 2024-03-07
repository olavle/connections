import styled from "styled-components";
import { useGameBoardContext } from "../GameBoardContext";
import { colorPick } from "../../ui/color";

const StyledWrongAnswerMessageContainer = styled.div`
  margin: 1rem;
  color: ${colorPick.error};
  font-size: 2rem;
`;

export const WrongAnswerMessage = () => {
  const { wrongAnswerMessage } = useGameBoardContext();

  if (!wrongAnswerMessage.visible) {
    return null;
  }

  const message =
    wrongAnswerMessage.correctAnswers >= 2
      ? `Almost there, you got only ${
          4 - wrongAnswerMessage.correctAnswers
        } wrong!`
      : "Just wrong :D";

  return (
    <StyledWrongAnswerMessageContainer>
      {message}
    </StyledWrongAnswerMessageContainer>
  );
};
