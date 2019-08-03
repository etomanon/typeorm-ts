import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const Link = styled.a<SpaceProps>`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${space}
`