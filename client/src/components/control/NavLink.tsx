import styled from "styled-components";
import { NavLink as ReactNavLink } from "react-router-dom";

export const NavLink = styled(ReactNavLink).attrs({
  activeClassName: "active-navlink"
})`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  &.${p => p.activeClassName} {
    font-weight: 500;
  }
`;
