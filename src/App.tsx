import React from 'react';
import styled from 'styled-components';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import 'nes.css/css/nes.min.css';

import ReadingPage from './pages/reading';
import ChoicePage from './pages/choice';
import { Home } from './pages/home/Home';
import { End, Guide } from './pages/guide/Guide';
import { Main } from './pages/main/Main';

import { ItemInspectDialog } from 'src/components/dialog';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
          <Route path="/ending" exact>
            <End />
          </Route>
          <Route path="/reading" exact>
            <ReadingPage />
          </Route>
          <Route path="/choice" exact>
            <ChoicePage />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
      <ItemInspectDialog />
    </Container>
  );
}

export default App;
