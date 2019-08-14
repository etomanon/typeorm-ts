import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: translate3D(-100%, 0, 0);
  }

  to {
    transform: translate3D(100%, 0, 0);
  }
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${rotate} 1s ease-in infinite;
`;
