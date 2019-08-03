import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@rebass/grid";

import { userLogout, userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

import { Link } from "../control/Link";
import { NavLink } from "../control/NavLink";
import { Text } from "../text/Text";

import { Logo, HeaderWrapper } from "./styled/Header";
import logo from "./logo.webp";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);
  return (
    <>
      <HeaderWrapper
        m={["1rem 0.5rem", "1rem 0.5rem", "1rem auto"]}
        flexDirection={["column", "row"]}
      >
        <Flex width={1} justifyContent="center" alignItems="center" mb={3}>
          <Logo src={logo} />
          <Text ml={2} mr={3} fontSize={4} mb={[2, 0]}>
            Art by Claina
          </Text>
        </Flex>
        <NavLink exact to="/" mr={[0, 3]} mb={[2, 0]}>
          Domů
        </NavLink>
        {user.user ? (
          <>
            <NavLink exact to="/dashboard" mr={[0, 3]} mb={[2, 0]}>
              Dashboard
            </NavLink>
            <Link href="/file" mr={[0, 3]} mb={[2, 0]}>
              Soubory
            </Link>
            <Link
              onClick={() => dispatch(userLogout())}
              href="/api/auth/logout"
            >
              Odhlásit se
            </Link>
          </>
        ) : (
          <Link href="/api/auth/twitch">Přihlásit se</Link>
        )}
      </HeaderWrapper>
    </>
  );
};
