import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  useEffect(() => {
    console.log("using effect");
    dispatch(userGet());
  }, [dispatch]);
  return (
    <>
      <div>Dashboard</div>
      {user.user && (
        <>
          <div>{user.user.name}</div>
          <div>{user.user.role}</div>
        </>
      )}
    </>
  );
};
