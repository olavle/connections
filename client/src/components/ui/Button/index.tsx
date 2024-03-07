import styled, { css } from "styled-components";
import { IBaseProps } from "../types";
import { FC, RefObject, useState } from "react";
import { AnimatedProps, animated } from "@react-spring/web";
import { colorPick } from "../color";

type TButtonColor = "success" | "error" | "default";

interface IProps extends IBaseProps {
  action?: () => void;
  forwardRef?: RefObject<HTMLButtonElement>;
  springs?: AnimatedProps<any>;
  fullWidth?: boolean;
  disabled?: boolean;
  color?: TButtonColor;
}

interface IStyledButtonProps {
  $isMouseDown: boolean;
  $fullWidth: boolean;
  $color: TButtonColor;
}

const StyledButton = styled(animated.button)<IStyledButtonProps>`
  padding: 1rem;
  color: ${colorPick.text};
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: ${(props) =>
    props.$isMouseDown ? colorPick.secondary : colorPick.yellow};
  border: 2px solid ${colorPick.primary};
  border-radius: 1rem;
  font-size: 2rem;
  width: ${({ $fullWidth }) => $fullWidth && "100%"};

  ${({ $isMouseDown }) =>
    $isMouseDown &&
    css`
      box-shadow: inset 1px 1px 2px black;
      font-style: italic;
    `};
  ${({ $color }) => {
    if ($color === "error") {
      return css`
        color: ${colorPick.text};
        background-color: ${colorPick.error};
      `;
    }
    if ($color === "success") {
      return css`
        color: ${colorPick.text};
        background-color: ${colorPick.success};
      `;
    }
  }};
`;

export const Button: FC<IProps> = ({
  action,
  forwardRef,
  children,
  springs,
  fullWidth = false,
  disabled = false,
  color = "default",
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
      $fullWidth={fullWidth}
      $color={color}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsMouseDown(false)}
      ref={forwardRef}
      disabled={disabled}
      style={{
        ...springs,
      }}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
};
