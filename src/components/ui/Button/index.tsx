import styled, { css } from "styled-components";
import { IBaseProps } from "../types";
import { FC, RefObject, useState } from "react";
import { AnimatedProps, animated } from "@react-spring/web";
import { colorPick } from "../color";

interface IProps extends IBaseProps {
  action?: () => void;
  forwardRef?: RefObject<HTMLButtonElement>;
  springs?: AnimatedProps<any>;
}

interface IStyledButtonProps {
  $isMouseDown: boolean;
}

const StyledButton = styled(animated.button)<IStyledButtonProps>`
  padding: 1rem;
  margin: 1rem;
  color: ${colorPick.text};
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: ${(props) =>
    props.$isMouseDown ? colorPick.secondary : colorPick.secondary};
  border: 2px solid ${colorPick.primary};
  border-radius: 1rem;

  ${({ $isMouseDown }) =>
    $isMouseDown &&
    css`
      box-shadow: inset 1px 1px 2px black;
      font-style: italic;
    `}
`;

export const Button: FC<IProps> = ({
  action,
  forwardRef,
  children,
  springs,
  ...restProps
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseUp = () => {
    setIsMouseDown(false);
    action && action();
  };

  return (
    <StyledButton
      $isMouseDown={isMouseDown}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={handleMouseUp}
      ref={forwardRef}
      style={{
        ...springs,
      }}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
};
