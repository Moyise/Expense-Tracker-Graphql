import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/home/HomeScreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
