import 'src/js/actions/index.js'; // TODO find a way to remove this
import { combineReducers } from 'redux';
import sketcherReducer from '@doodle3d/doodle3d-core/lib/reducer';
import { routerReducer } from 'react-router-redux';
import filesReducer, { currentName } from './filesReducer.js';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'react-notification-system-redux';
import blockingSpinnerReducer from './blockingSpinnerReducer.js';
import promptReducer from 'redux-prompt/reducer';

export default combineReducers({
  sketcher: sketcherReducer,
  routing: routerReducer,
  form: formReducer,
  notifications: notificationsReducer,
  files: filesReducer,
  blockingSpinner: blockingSpinnerReducer,
  prompt: promptReducer,
});

export const currentFileName = (state) => currentName(state.files);
