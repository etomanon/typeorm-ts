import styled from "styled-components";
import { NavLink as ReactNavLink } from "react-router-dom";
import { space, SpaceProps } from "styled-system";

export const NavLink = styled(ReactNavLink).attrs({
  activeClassName: "active-navlink"
})<SpaceProps>`
  color: inherit;
  text-decoration: none;
  &.${p => p.activeClassName} {
    font-weight: 500;
  }
  &:hover,
  &:focus {
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    outline: none;
  }
  ${space};
`;
