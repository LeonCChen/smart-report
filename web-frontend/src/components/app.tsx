import {FunctionalComponent, h} from 'preact';
import {Route, Router} from 'preact-router';

import Home from '../routes/home';
import SignUp from '../routes/signup';
import EmailCode from '../routes/emailcode';
import NewsSources from '../routes/newssources';
import NotFoundPage from '../routes/notfound';

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup/confirm" component={EmailCode} />
        <Route path="/news-sources" component={NewsSources} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
