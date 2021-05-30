import { createQuery, awsUpload } from 'src/js/utils/utils.js';
import * as actions from './index.js';
import sketchDataToJSON from '@doodle3d/doodle3d-core/lib/shape/sketchDataToJSON';
import { JSONToBlob } from '@doodle3d/doodle3d-core/lib/utils/binaryUtils';
import { isSketchEmpty, currentFileName } from 'src/js/reducers/index.js';
import { printUrl as API } from 'src/js/constants/envs.js';
import { createPromiseAction } from 'redux-promise-action';

export const UPLOAD = 'PRINT_UPLOAD';
export const upload = createPromiseAction(async (dispatch, getState) => {
  const state = getState();
  if (isSketchEmpty(state)) throw new Error('Sketch is empty');

  try {
    dispatch(actions.blockingSpinner.start());

    const name = currentFileName(state) || 'Doodle';
    const json = sketchDataToJSON(state.sketcher.present);
    const blob = JSONToBlob(json);
    const file = await awsUpload(blob, `${name}.doodle3d`);
    const url = `${API}/?${createQuery({ file, name })}`;

    const popupWindow = window.open(url, '_blank');
    if (!popupWindow) {
      dispatch(actions.prompt.open({
        title: `Print file`,
        message: 'Open in Doodle3D Slicer',
        link: url,
        submitText: 'Open',
        form: []
      }));
    }
  } finally {
    dispatch(actions.blockingSpinner.stop());
  }
}, UPLOAD, {
  onError: (error) => actions.notification.error({
    title: `Failed to upload Doodle3D Slicer: ${error.message}`
  })
});
