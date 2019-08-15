import styled from "styled-components";
import { space, SpaceProps, color, ColorProps, fontWeight, FontWeightProps } from "styled-system";

export const Link = styled.a<FontWeightProps & SpaceProps & ColorProps>`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${space};
  ${color};
  ${fontWeight};
`;
