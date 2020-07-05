import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../components/MainPage";
import NotFoundPage from "../components/NotFoundPage";
import USgdpPage from "../components/USgdpPage";
import DopingPage from "../components/DopingPage";
import Project3Page from "../components/Project3Page";
import Project4Page from "../components/Project4Page";
import Project5Page from "../components/Project5Page";
import ContactPage from "../components/ContactPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={MainPage} exact={true} />
        <Route path="/usgdp" component={USgdpPage} />
        <Route path="/doping" component={DopingPage} />
        <Route path="/project3" component={Project3Page} />
        <Route path="/project4" component={Project4Page} />
        <Route path="/project5" component={Project5Page} />
        <Route path="/contact" component={ContactPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
