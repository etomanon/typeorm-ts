import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Flex} from '@rebass/grid';

import { userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

import {Text} from '../../components/text/Text';

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
          <Text textAlign="center" mb={2}>Účet: {user.user.name}</Text>
          <Text textAlign="center">Role: {user.user.role}</Text>
        </Flex>
      )}
    </>
  );
};
