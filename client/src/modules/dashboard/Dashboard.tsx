import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "@rebass/grid";

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
  return (
    <>
      {user.user && (
        <Flex flexDirection="column" alignItems="center">
          <Text textAlign="center" mb={2}>
            Účet: {user.user.name}
          </Text>
          <Text textAlign="center">Role: {roles[user.user.role]}</Text>
          <Text textAlign="center">
            Pro aktualizaci role se prosím odhlašte a znovu přilašte.
          </Text>
        </Flex>
      )}
    </>
  );
};
