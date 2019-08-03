import styled from 'styled-components';
import { display, DisplayProps, space, SpaceProps, fontSize, FontSizeProps, textAlign, TextAlignProps } from 'styled-system';


export const Text = styled.div<DisplayProps & SpaceProps & FontSizeProps & TextAlignProps>`
  display: inline-block;
  ${display};
  ${space};
  ${fontSize};
  ${textAlign};
`