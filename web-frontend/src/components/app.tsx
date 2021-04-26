import {FunctionalComponent, h} from 'preact';
import {useState} from 'preact/hooks';
import {Route, Router} from 'preact-router';
import Store from '../store';

import Home from '../routes/home';
import SignUp from '../routes/signup';
import EmailCode from '../routes/emailcode';
import Login from '../routes/login';
import NewsSources from '../routes/newssources';
import Account from '../routes/account';
import NotFoundPage from '../routes/notfound';

const App: FunctionalComponent = () => {
  // initialize global state
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  return (
    <Store.Provider value={{token, setToken, email, setEmail, verifyCode, setVerifyCode}}>
      <div id="app">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signup/confirm" component={EmailCode} />
          <Route path="/login" component={Login} />
          <Route path="/news-sources" component={NewsSources} />
          <Route path="/account" component={Account} />
          <NotFoundPage default />
        </Router>
      </div>
    </Store.Provider>
  );
};

export default App;
