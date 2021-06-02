import * as envs from 'src/js/constants/envs.js';

// log version
import { VERSION } from '@doodle3d/doodle3d-core/lib/constants/general.js';
console.log(`#####################################################`); // eslint-disable-line no-console
console.log(`############# Doodle3D Transform v${VERSION} #############`); // eslint-disable-line no-console

// polyfills
import 'whatwg-fetch';
import 'babel-polyfill';
// import 'core-js';
// import 'core-js/fn/object/assign';

// normalize css
import jss from 'jss';
import preset from 'jss-preset-default';
import normalize from 'normalize-jss';
jss.setup(preset());
jss.createStyleSheet(normalize).attach();
jss.createStyleSheet({
  '@global': {
    '*': { margin: 0, padding: 0 },
    '#app, body, html': { height: '100%', fontFamily: 'sans-serif' },
    body: { overflow: 'auto' },
    html: { overflow: 'hidden' },
    a: { color: '#358ED7' }
  }
}).attach();

import createDebug from 'debug';
const debug = createDebug('d3d:index');

// create store
import reducer from './reducers/index.js';
import configureStore from './store.js';
const store = configureStore(reducer);
debug('initial state: ', store.getState());

// load local (browser & device specific) data
import * as actions from 'src/js/actions/index.js';
store.dispatch(actions.localStore.read());

// For debugging purposes: allow dispatching actions from Web console
import actionWrapper from 'redux-action-wrapper';
window.actions = actionWrapper(actions, store.dispatch);

// Create an enhanced history that syncs navigation events with the store
import { browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(envs.platform === 'ios-app' ? hashHistory : browserHistory, store);

window.onbeforeunload = event => {
  const state = store.getState();

  if (state.files.current.unSavedData) {
    event.returnValue = 'You have unsaved work';
    return event.returnValue;
  }
};

// add hotkeys
let { pathname } = history.getCurrentLocation();
history.listen(event => {
  pathname = event.pathname;
});

const keyHandler = event => store.dispatch(actions.hotkeys.keyPress(event, pathname));
window.addEventListener('keydown', keyHandler);

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from 'src/js/muiTheme.js';
import Root from 'src/js/Root.js';
import NotificationsWrapper from 'src/js/components/NotificationsWrapper.js';
import BlockingSpinner from 'src/js/components/BlockingSpinner.js';
import Prompt from '@doodle3d/redux-prompt/lib/component';
import { isWebGLAvailable } from '@doodle3d/doodle3d-core/lib/utils/webGLSupport.js';
import bowser from 'bowser';

async function init() {
  store.dispatch(actions.files.init());

  render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <span>
            <Root />
            <BlockingSpinner />
            <NotificationsWrapper />
          </span>
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );

  if (!isWebGLAvailable) {
    store.dispatch(actions.notification.warning({
      title: `Oops… Doodle3D Transfrom is unable to use WebGL on your Device.`,
      autoDismiss: 0
    }));
  }

  if (bowser.mobile) {
    store.dispatch(actions.notification.warning({
      title: `This app is optimized for tablet and desktop devices.`,
      autoDismiss: 0
    }));
  }

  // if (module.hot) {
  //   module.hot.accept('./Root.js', () => {
  //     debug('Root changed, re-rendering');
  //     const NewRoot = require('./Root.js').default;
  //     render(
  //       <AppContainer>
  //         <Provider store={store}>
  //           <MuiThemeProvider muiTheme={muiTheme}>
  //             <span>
  //               <NewRoot />
  //               <BlockingSpinner />
  //               <Prompt />
  //               <NotificationsWrapper />
  //             </span>
  //           </MuiThemeProvider>
  //         </Provider>
  //       </AppContainer>,
  //       document.getElementById('app')
  //     );
  //   });
  // }
}
init();

import ReactDOM from 'react-dom';
export function __unload() {
  try {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  } catch (e) {
    // ignoring unmount error
  }
  window.removeEventListener('keydown', keyHandler);
  history.unsubscribe();
}
