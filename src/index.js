import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { browserHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import DashboardWithRouter from "./Dashboard";
import LoanWithRouter from "./Loan";
import KivaWithRouter from "./Kiva";
import PrivateRoute from "./PrivateRoute";

import { withRouter } from "react-router-dom";

let apiName = "sampleCloudApi";
let path = "/items";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={DashboardWithRouter} />
      <PrivateRoute path="/dashboard" component={DashboardWithRouter} />
      <PrivateRoute path="/loan" component={LoanWithRouter} />
      <PrivateRoute path="/kiva" component={KivaWithRouter} />
    </Switch>
  </main>
);

const App = () => (
  <div>
    <Main />
  </div>
);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
