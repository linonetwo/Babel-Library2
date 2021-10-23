import React from 'react';
import styled from 'styled-components';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import 'nes.css/css/nes.min.css';

import ReadingPage from './pages/reading';
import { Home } from './pages/home/Home';
import { Guide } from './pages/guide/Guide';
import { Main } from './pages/main/Main';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App(): JSX.Element {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/main" exact>
            <Main />
          </Route>
          <Route path="/guide" exact>
            <Guide />
          </Route>
          <Route path="/reading" exact>
            <ReadingPage />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
