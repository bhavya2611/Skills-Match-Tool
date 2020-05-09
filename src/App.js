import React from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SplashScreen from "./Screens/SplashScreen";
import InfoScreen from "./Screens/InfoScreen";
import OutputScreen from "./Screens/OutputScreen";

// 35.185.130.228
// username: mehtabh

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route exact path="/Info" component={InfoScreen} />
        <Route exact path="/Results" component={OutputScreen} />
      </Switch>
    </Router>
  );
};

export default App;
