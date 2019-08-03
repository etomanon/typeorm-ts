import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "../modules/home/Home";
import { Dashboard } from "../modules/dashboard/Dashboard";
import { Error404 } from "../modules/error404/Error404";

import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Wrapper } from "../components/wrapper/styled/Wrapper";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Wrapper m={["0 0.5rem", "0 0.5rem", "0 auto"]}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={Error404} />
        </Switch>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
};
