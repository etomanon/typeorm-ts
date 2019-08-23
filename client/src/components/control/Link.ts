import styled from "styled-components";
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  fontWeight,
  FontWeightProps
} from "styled-system";

interface LinkProps {
  noUnderline?: boolean;
}

export const Link = styled.a<
  LinkProps & FontWeightProps & SpaceProps & ColorProps
>`
  color: inherit;
  text-decoration: none;
  text-decoration: ${props => (props.noUnderline ? "none" : "underline")};
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
  ${space};
  ${color};
  ${fontWeight};
`;
