import styled, { css } from "styled-components";
import { width, WidthProps, space, SpaceProps } from "styled-system";

interface ButtonProps {
  variant?: "filled";
}

const cssFilled = css`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  &:hover,
  &:focus {
    background: #fff;
    color: #000;
  }
`;

export const Button = styled.button<ButtonProps & WidthProps & SpaceProps>`
  padding: 1rem 1.2rem;
  text-transform: uppercase;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: #fff;
  cursor: pointer;
  color: #000;
  justify-content: center;
  transition: all 0.2s ease-in;
  font-size: 1.4rem;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  &:focus {
    outline: 0;
  }
  ${props => props.variant === "filled" && cssFilled}
  ${width};
  ${space};
`;
