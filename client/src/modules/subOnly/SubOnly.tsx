import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Text } from "../../components/text/Text";
import { Link } from "../../components/control/Link";

export const SubOnly: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Text display="block" textAlign="center">
        Stránka je pouze pro předplatitele{" "}
        <Link
          fontWeight={500}
          color="primary"
          href="https://www.twitch.tv/claina"
          target="_blank"
        >
          Clainy na Twitchi
        </Link>
      </Text>
    </>
  );
};
