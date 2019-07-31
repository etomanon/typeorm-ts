import React from "react";
import { Flex } from "@rebass/grid";

import { Link } from "../control/Link";
import { NavLink } from "../control/NavLink";
import { Text } from "../text/Text";

export const Header: React.FC = () => {
  return (
    <>
      <Flex>
        <Text mr={1}>Test Auth</Text>
        <NavLink to="/">Home</NavLink>
        <Link href="/api/auth/twitch">Login</Link>
      </Flex>
    </>
  );
};
