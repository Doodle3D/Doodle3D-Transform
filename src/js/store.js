import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { browserHistory, hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import { makePersistantMiddleware } from 'src/js/services/localStore.js';
import { LOCAL_STORE_READ } from 'src/js/actions/localStore.js';
import { platform } from 'src/js/constants/envs.js';
import promptMiddleware from 'redux-prompt/middleware';

import debugOverlappingDispatches from './utils/debugOverlappingDispatches.js';

import createDebug from 'debug';
// in dev mode when finds debug key in localStorage
// (which is also used by debug module)
const devMode = createDebug.load() !== undefined;
const debug = createDebug('d3d:store');

// create router middleware that handles route actions
const reduxRouterMiddleware = routerMiddleware(platform === 'ios-app' ? hashHistory : browserHistory);

export default function configureStore(reducers, initialState) {
  let store;

  let middleware = [
    reduxRouterMiddleware,
    thunkMiddleware,
    promiseMiddleware(),
    promptMiddleware(),
    makePersistantMiddleware(state => state.localStore, LOCAL_STORE_READ),
    debugOverlappingDispatches()
  ];

  if (devMode) {
    // add development middleware
    const logger = createLogger({
      predicate: (_, action) => action.log !== false,
      collapsed: true,
      logErrors: false
    });
    middleware = [
      ...middleware,
      logger
    ];
  }
  store = createStore(
    reducers,
    initialState,
    compose( // compose store enhancers
      applyMiddleware(...middleware)
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
      const reducer = require('./reducers/index.js').default;
      debug('Reducers changed, replacing reducers of store');
      store.replaceReducer(reducer);
    });
  }

  return store;
}
