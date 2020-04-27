import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SplashScreen from "./Screens/SplashScreen";
import ScheduleScreen from "./Screens/ScheduleScreen";

// 35.185.130.228
// username: mehtabh

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route exact path="/Schedule" component={ScheduleScreen} />
      </Switch>
    </Router>
  );
};

export default App;
