import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/Button";
import { useSpring } from "@react-spring/web";
import { useGameBoardContext } from "../GameBoardContext";

export const SubmitSlider = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { checkIsCorrectWords, wrongAnswers } = useGameBoardContext();

  const [parentWidth, setParentWidth] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  console.log({ buttonWidth });

  const [buttonPosition, setButtonPosition] = useState(0);

  const [springs, api] = useSpring(() => ({
    from: { x: buttonPosition },
  }));

  const handleButtonMove = () => {
    const sliderChunk = parentWidth / 3;
    const targetParentWidth = !wrongAnswers ? 0 : sliderChunk * wrongAnswers;

    const newButtonPosition = !wrongAnswers
      ? 0
      : targetParentWidth - buttonWidth;

    api.start({
      from: {
        x: buttonPosition,
      },
      to: {
        x: newButtonPosition,
      },
    });

    setButtonPosition(newButtonPosition);
  };

  useEffect(() => {
    handleButtonMove();
  }, [wrongAnswers]);

  const handleCheckResult = () => {
    checkIsCorrectWords();
  };

  return (
    <div ref={parentRef}>
      <Button
        action={handleCheckResult}
        forwardRef={buttonRef}
        springs={springs}
      >
        Check
      </Button>
    </div>
  );
};
