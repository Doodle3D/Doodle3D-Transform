// sketcher
import * as sketcher from '@doodle3d/doodle3d-core/lib/actions';
export { sketcher };
import * as config from 'src/js/services/config.js';

// libs
import { saveAs } from 'file-saver';
import { routerActions as router } from 'react-router-redux';
import * as notificationActions from 'react-notification-system-redux';
import * as prompt from 'redux-prompt/actions';
export const notification = {
  show: ({ position = 'tc', ...args }) => notificationActions.show({ position, ...args }),
  success: ({ position = 'tc', ...args }) => notificationActions.success({ position, ...args }),
  warning: ({ position = 'tc', ...args }) => notificationActions.warning({ position, ...args }),
  error: ({ position = 'tc', ...args }) => notificationActions.error({ position, ...args }),
  info: ({ position = 'tc', ...args }) => notificationActions.info({ position, ...args }),
  hide: notificationActions.hide,
  removeAll: notificationActions.removeAll
};
export { router, prompt };

import * as localStore from './localStore.js';
import * as files from './files.js';
import * as hotkeys from './hotkeys.js';
import * as blockingSpinner from './blockingSpinner.js';
export { localStore, files, hotkeys, blockingSpinner };

import { currentFileName } from 'src/js/reducers/index.js';
import { createFile } from '@doodle3d/doodle3d-core/lib/utils/exportUtils.js';

export const STL_EXPORT = 'STL_EXPORT';
export const OBJ_EXPORT = 'OBJ_EXPORT';
export const JSON_EXPORT = 'JSON_EXPORT';
export const FACEBOOK_EXPORT = 'FACEBOOK_EXPORT';
export const TWITTER_EXPORT = 'TWITTER_EXPORT';
export const MATERIALIZE_EXPORT = 'MATERIALIZE_EXPORT';
export const YOUMAGINE_EXPORT = 'YOUMAGINE_EXPORT';
export const THINGIVERSE_EXPORT = 'THINGIVERSE_EXPORT';

export function downloadStl() {
  return async (dispatch, getState) => {
    const state = getState();

    const name = `${currentFileName(state) || 'Doodle'}.stl`;
    const { exportLineWidth: lineWidth } = config.get();

    return dispatch({
      type: STL_EXPORT,
      payload: createFile(state.sketcher.present, 'stl-blob', { lineWidth })
        .then(blob => dispatch(saveAs(blob, name)))
        .catch(() => {
          // dispatch(notification.error({ title: 'Downloading stl file failed' }));
        })
    });
  };
}
export function downloadJSON() {
  return async (dispatch, getState) => {
    const state = getState();

    const name = `${currentFileName(state) || 'Doodle'}.json`;

    return dispatch({
      type: JSON_EXPORT,
      payload: createFile(state.sketcher.present, 'json-blob')
        .then(blob => dispatch(saveAs(blob, name)))
        .catch(() => {
          // dispatch(notification.error({ title: 'Downloading json file failed' }));
        })
    });
  };
}
export function downloadObj() {
  return async (dispatch, getState) => {
    const state = getState();

    const name = `${currentFileName(state) || 'Doodle'}.zip`;

    return dispatch({
      type: OBJ_EXPORT,
      payload: createFile(state.sketcher.present, 'obj-blob')
        .then(blob => dispatch(saveAs(blob, name)))
        .catch(() => {
          // dispatch(notification.error({ title: 'Downloading obj file failed' }));
        })
    });
  };
}

import bowser from 'bowser';
import { platform } from 'src/js/constants/envs.js';
import sanitize from 'sanitize-filename';
