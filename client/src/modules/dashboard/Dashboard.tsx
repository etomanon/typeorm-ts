import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "@rebass/grid";

import ky from "../../ky/ky";
import { userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

import { Text } from "../../components/text/Text";

const roles = {
  admin: "Admin",
  sub: "Jste předplatitel - můžete stahovat soubory",
  user: "Nejste předplatitel Clainy - nemůžete stahovat soubory"
};

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);
  useEffect(() => {
    ky.get("file");
  }, []);

  return (
    <>
      {user.user && (
        <Flex flexDirection="column" alignItems="center">
          <Text textAlign="center" mb={2} mt={1}>
            Vítejte {user.user.name}
          </Text>
          <Text
            textAlign="center"
            color={user.user.role === "user" ? "error" : "primary"}
          >
            Role: {roles[user.user.role]}
          </Text>
          <Text textAlign="center" fontSize={1}>
            Pro aktualizaci role se prosím odhlašte a znovu přihlašte.
          </Text>
        </Flex>
      )}
    </>
  );
};
