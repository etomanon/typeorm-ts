import React from "react";
import { RouteComponentProps } from "react-router-dom";
// import ky from "ky";
// import { parse } from "query-string";

import { Text } from "../../components/text/Text";

export const Home: React.FC<RouteComponentProps> = () => {
  // React.useEffect(() => {
  //   const parsed = parse(location.search);
  //   if (parsed.logged) {
  //     ky.get("/api/user/follows")
  //       .json<any>()
  //       .then(result => console.log(result))
  //       .catch(err => console.log(err));
  //   }
  // }, [location.search]);
  return (
    <>
      <Text display="block" textAlign="center">Stránka pro sdílení souborů</Text>
    </>
  );
};
