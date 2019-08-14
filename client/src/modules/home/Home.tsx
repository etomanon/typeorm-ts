import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Text } from "../../components/text/Text";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      {/* <Text display="block" textAlign="center">Stránka pro sdílení souborů</Text> */}
      <Text display="block" textAlign="center">
        Lorem ipsum
      </Text>
    </>
  );
};
