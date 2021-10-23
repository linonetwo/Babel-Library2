import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import './style.css';
import 'nes.css/css/nes.min.css';

import Home from './pages/home/Home';
import Guide from './pages/guide/Guide';
import Main from './pages/main/Main';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/main" exact>
          <Main />;
        </Route>
        <Route path="/guide" exact>
          <Guide />;
        </Route>
        <Route path="/" exact>
          <Home />;
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
