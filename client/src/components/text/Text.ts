import styled, { css } from "styled-components";
import {
  display,
  DisplayProps,
  space,
  SpaceProps,
  fontSize,
  FontSizeProps,
  textAlign,
  TextAlignProps,
  fontWeight,
  FontWeightProps,
  color,
  ColorProps,
  width,
  WidthProps
} from "styled-system";

interface TextProps {
  pointer?: boolean;
}

const cssPointer = css`
  cursor: pointer;
`;

export const Text = styled.div<
  WidthProps &
    TextProps &
    DisplayProps &
    SpaceProps &
    FontSizeProps &
    TextAlignProps &
    FontWeightProps &
    ColorProps
>`
  display: inline-block;
  ${display};
  ${space};
  ${fontSize};
  ${textAlign};
  ${fontWeight};
  ${color};
  ${props => props.pointer && cssPointer};
  ${width};
`;
