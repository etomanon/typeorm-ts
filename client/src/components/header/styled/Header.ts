import styled, { css } from "styled-components";
import {
  space,
  SpaceProps,
  flexDirection,
  FlexDirectionProps
} from "styled-system";

interface MobileMenuProps {
  active: boolean;
}

export const HeaderWrapper = styled.header<SpaceProps & FlexDirectionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 75em;
  color: ${({ theme }) => theme.colors.primary};
  ${space}
  ${flexDirection}
`;

export const Logo = styled.img`
  display: flex;
`;

export const HeaderWrapperLinks = styled.header<MobileMenuProps>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  transition: all .25s ease-in;
  transform: translate3d(100%, 0, 0);
  height: 100%;
  z-index: 2;
  ${props =>
    props.active &&
    css`
      transform: translate3d(0, 0, 0);
    `}
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    position: static;
    height: auto;
    flex-direction: row;
    background: #fff;
    color: ${({ theme }) => theme.colors.primary};
    transform: translate3d(0, 0, 0);
  }
`;

export const HeaderBurger = styled.div<MobileMenuProps>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 29;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`;

export const HeaderBurgerLine = styled.span<MobileMenuProps>`
  position: absolute;
  height: 2px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: all 0.25s ease-in;
  border-radius: 4px;
  &:nth-child(1) {
    top: 0;
  }
  &:nth-child(2) {
    top: 50%;
  }
  &:nth-child(3) {
    top: 100%;
  }
  ${props =>
    props.active &&
    css`
      background: #fff;
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        top: 50%;
      }
      &:nth-child(1) {
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    `}
`;
