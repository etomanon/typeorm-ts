import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Link } from "../../components/control/Link";
import { Text } from "../../components/text/Text";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Text display="block" textAlign="center">
        Stránka pro sdílení souborů s předplatiteli{" "}
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
