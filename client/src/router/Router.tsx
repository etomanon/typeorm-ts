import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "../modules/home/Home";
import { Error404 } from "../modules/Error404/Error404";

import { Header } from "../components/header/Header";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};
