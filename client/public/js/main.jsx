import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RunnerRoot from './containers/runner_root';
import NotFound from './components/not_found';
import index from './reducers/index';
import loggingMiddleware from './middlewares/logging_middleware';

require('../css/normalize.css');
require('../css/main.css');
require('../css/main.scss');
require('../css/molviewer.css');
require('../browserconfig.xml');
require('../humans.txt');
require('../LICENSE.txt');
require('../robots.txt');
require('../apple-touch-icon.png');
require('../tile.png');
require('../crossdomain.xml');
require('../tile-wide.png');

injectTapEventPlugin();

const store = createStore(
  index, applyMiddleware(thunkMiddleware, loggingMiddleware),
);

function codeSplitHomePage(location, callback) {
  System.import('./components/home_page').then(module =>
    callback(null, module.default),
  );
}
function codeSplitAppRoot(location, callback) {
  System.import('./containers/app_root').then(module =>
    callback(null, module.default),
  );
}

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" getComponent={codeSplitHomePage} />
      <Route path="/app" component={RunnerRoot}>
        <IndexRoute component={NotFound} />
        <Route path=":appId" getComponent={codeSplitAppRoot} />
        <Route path=":appId/:runId" getComponent={codeSplitAppRoot} />
        <Route path="*" component={NotFound} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>
),
  document.querySelector('.main'),
);
