import styled from 'styled-components';

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`