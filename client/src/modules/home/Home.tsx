import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import ky from "ky";
import { parse } from "query-string";

export const Home: React.FC<RouteComponentProps> = ({ location }) => {
  useEffect(() => {
    const parsed = parse(location.search);
    if (parsed.logged) {
      ky.get("/api/user/follows")
        .json<any>()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  }, [location.search]);
  return <div>app</div>;
};
