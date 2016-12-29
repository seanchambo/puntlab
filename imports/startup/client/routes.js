import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/app';
import { Public } from '../../ui/layouts/public';
import { Bets } from '../../ui/pages/bets';
import { Transactions } from '../../ui/pages/transactions';
import { Leaderboards } from '../../ui/pages/leaderboards';
import { AccountSettings } from '../../ui/pages/account-settings';
import { Index } from '../../ui/pages/index';
import { Login } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import { Signup } from '../../ui/pages/signup';
import configureStore from '../../store';

const store = configureStore(history);
const history = syncHistoryWithStore(browserHistory, store);

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ App }  onEnter={ requireAuth }>
          <IndexRoute name="index" component={ Index } onEnter={ requireAuth } />
          <Route name="bets" path="/bets" component={ Bets } onEnter={ requireAuth } />
          <Route name="transactions" path="/transactions" component={ Transactions } onEnter={ requireAuth } />
          <Route name="leaderboards" path="/leaderboards" component={ Leaderboards } onEnter={ requireAuth } />
          <Route name="account-settings" path="/settings" component={ AccountSettings } onEnter={ requireAuth } />
        </Route>
        <Route path="/login" component={ Public }>
          <IndexRoute name="login" component={ Login } />
        </Route>
        <Route path="/recover-password" component={ Public }>
          <IndexRoute name="recover-password" component={ RecoverPassword } />
        </Route>
        <Route path="/reset-password" component={ Public }>
          <IndexRoute name="reset-password" component={ ResetPassword } />
        </Route>
        <Route path="/signup" component={ Public }>
          <IndexRoute name="signup" component={ Signup } />
        </Route>
        <Route path="*" component={ NotFound } />
      </Router>
    </Provider>,
    document.getElementById('react-root')
  );
});
