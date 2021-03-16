import {FunctionalComponent, h} from 'preact';
import {Route, Router} from 'preact-router';

import Home from '../routes/home';
import SignUp from '../routes/signup';
import NotFoundPage from '../routes/notfound';

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
