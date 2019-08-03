import styled from 'styled-components';

export const FooterMain = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  color: #fff;
`