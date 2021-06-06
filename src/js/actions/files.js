import fileDialog from 'file-dialog';
import { createUniqueName, sketchDataToDoc, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT } from 'src/js/utils/saveUtils.js';
import sketchDataToJSON from '@doodle3d/doodle3d-core/lib/shape/sketchDataToJSON';
import { JSONToBlob } from '@doodle3d/doodle3d-core/lib/utils/binaryUtils';
import JSZip from 'jszip';
import * as actions from './index.js';
import { currentFileName, } from 'src/js/reducers/index.js';
import { notification } from './index.js';
import * as envs from 'src/js/constants/envs.js';
import { saveAs } from 'file-saver';
import seed from 'pouchdb-seed-design';
import { createPromiseAction } from 'redux-promise-action';
import PouchDB from 'pouchdb';
import * as notificationActions from 'react-notification-system-redux';
import JSONToSketchData from '@doodle3d/doodle3d-core/lib/shape/JSONToSketchData';
import { VERSION } from '@doodle3d/doodle3d-core/lib/constants/general.js';
import createSceneData from '@doodle3d/doodle3d-core/lib/d3/createSceneData';
import { generateThumb } from '@doodle3d/doodle3d-core/lib/utils/generateThumb.js';
import { blobToJSON } from '@doodle3d/doodle3d-core/lib/utils/binaryUtils.js';

export const SKETCH_EXPORT = 'SKETCH_EXPORT';
export const ALL_SKETCHES_EXPORT = 'ALL_SKETCHES_EXPORT';

export const OPEN_FILE = 'OPEN_FILE';
export const openFile = (data, name, id) => {
  return (dispatch) => {
    dispatch({ type: OPEN_FILE, name, data, id });
    dispatch(actions.sketcher.openSketch({ data }));
  };
};

export const saveFile = (name) => {
  return async (dispatch, getState) => {
    const state = getState();

    const currentFileID = state.files.id;
    const savedFile = currentFileID !== null; // saved files always have  an id
    const changedName = currentFileName(state) !== name;

    const overrideId = (!savedFile || changedName) ? null : currentFileID;

    const sketcherState = getState().sketcher.present;
    const doc = await sketchDataToDoc(name, sketcherState);

    return dispatch(actions.files.saveDoodle(name, doc, overrideId));
  };
};

export const downloadAllSketches = () => {
  // this function can be alot more optimized
  // pouch db actually returns attachments as blobs
  // when setting sketch to true this attachment is automatically converted to sketch data
  // in the for loop the sketch data is converted back to blob
  return async (dispatch, getState) => {
    const names = [];
    const zip = new JSZip();

    const { value: files } = await dispatch(actions.files.loadAll({
      include_docs: true,
      attachments: true,
      binary: true
    }));
    for (const { name, _attachments: { sketch: { data: sketchData }, img: { data: imgData } }, updatedOn } of files) {
      const uniqueName = createUniqueName(name || 'Doodle', names);
      const date = new Date(updatedOn);
      zip.file(`sketches/${uniqueName}.doodle3d`, sketchData, { binary: true, date: date });
      zip.file(`images/${uniqueName}.png`, imgData, { binary: true, date: date });
      names.push(uniqueName);
    }
    zip.file(`index.html`, `
      <!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>
        ${names.map(name =>
          `<a href="sketches/${name}.doodle3d">
            <img src="images/${name}.png" title="${name}" alt="${name}" width="200" />
          </a>`
        ).join("")}
      </body>
      </html>`, { binary: false });
    const dataBlob = await zip.generateAsync({ type: 'blob' });
    return dispatch({
      type: ALL_SKETCHES_EXPORT,
      payload: dispatch(saveAs(dataBlob, 'Doodle3D-doodles-'+new Date().toISOString().split('T')[0]+'.zip'))
    }).catch(error => {
      dispatch(notification.error({ title: 'Saving doodle failed' }));
      throw error;
    });
  };
};

export const openFileSelector = () => {
  return async (dispatch, getState) => {
    const files = await fileDialog({ multiple: true });
    for (let i = 0; i < files.length; i ++) {
        const file = files[i];
        await loadFile(dispatch, file.name, () => Promise.resolve(file))
    }
  };

  async function loadFile(dispatch, fileName, getData) {
    let matches = fileName.match(/\.[0-9a-z]+$/i);
    if (!matches) return;

    switch (matches[0].toUpperCase()) {
      case ".ZIP":
        let zip = await JSZip.loadAsync(await getData());

        for (let fileName in zip.files) {
          await loadFile(dispatch, fileName, () => zip.file(fileName).async("blob"));
        }

        break;
      case ".DOODLE3D":
        const sketchData = await getData();

        const sketcherState = await createSceneData(await JSONToSketchData(await blobToJSON(sketchData)));
        const imgBlob = await generateThumb(sketcherState, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, 'blob');
        const sketchBlob = new Blob([sketchData], { type: 'application/json' });

        const doc = {
          name: fileName.replace(".doodle3d",""),
          appVersion: VERSION,
          _attachments: {
            img: { content_type: imgBlob.type, data: imgBlob },
            sketch: { content_type: sketchBlob.type, data: sketchBlob }
          }
        };

        await dispatch(actions.files.saveDoodle(name, doc, null));
        break;
    }
  }
}

export const downloadSketch = (doc) => {
  return (dispatch, getState) => {
    console.log(doc);
    const { name, _attachments: { sketch: { data } }, updatedOn } = doc;

    const fileName = `${name || 'Doodle'}.doodle3d`;

    return dispatch({
      type: SKETCH_EXPORT,
      payload: dispatch(saveAs(data, fileName))
    }).catch(error => {
      dispatch(notification.error({ title: 'Downloading doodle failed' }));
      throw error;
    });
  };
};


export const downloadCurrentSketch = (name) => {
  return (dispatch, getState) => {
    const state = getState();

    const fileName = `${name || 'Doodle'}.doodle3d`;

    const json = sketchDataToJSON(state.sketcher.present);
    const blob = JSONToBlob(json);
    return dispatch({
      type: SKETCH_EXPORT,
      payload: dispatch(saveAs(blob, fileName))
    }).catch(error => {
      dispatch(notification.error({ title: 'Downloading doodle failed' }));
      throw error;
    });
  };
};


let db;
let seedingDesignDoc;

export function init() {
  return async (dispatch, getState) => {
    db = new PouchDB('doodle3d-files');

    seedingDesignDoc = seed(db, {
      sketches: {
        views: {
          updatedOn: {
            map: function (doc) {
              if (doc.updatedOn) {
                emit(doc.updatedOn);
              }
            }.toString()
          },
          name: {
            map: function (doc) {
              if (doc.name) {
                emit(doc.name);
              }
            }.toString()
          }
        }
      }
    });
  };
}

export const LOAD_GALLERY = 'LOAD_GALLERY';
export const loadGallery = createPromiseAction(async (dispatch, getState, page = 0, pageLength = 10, type = 'updatedOn', desc = true) => {
  console.log("db", db);
  console.log("seedingDesignDoc", seedingDesignDoc);
  await seedingDesignDoc;
  return db.query(`sketches/${type}`, {
    include_docs: true,
    attachments: true,
    binary: true,
    descending: desc,
    limit: pageLength,
    skip: page * pageLength
  });
}, LOAD_GALLERY);


export const REMOVE_DOODLE = 'REMOVE_DOODLE';
export const removeDoodle = createPromiseAction(async (dispatch, getState, id) => {
  const doc = await db.get(id);
  const { _id, _rev } = doc;
  await db.put({ _id, _rev, _deleted: true });
  return doc;
}, REMOVE_DOODLE, {
  onSuccess: ({ name }) => notificationActions.success({ position: 'tc', title: `successfully deleted doodle: ${name}` }),
  onError: () => notificationActions.error({ position: 'tc', title: `failed to delete doodle` })
});

export const SAVE_DOODLE = 'SAVE_DOODLE';
export const saveDoodle = createPromiseAction(async (dispatch, getState, name, doc, overrideId) => {
  doc.updatedOn = Date.now();

  if (overrideId) {
    const oldDoc = await db.get(overrideId);
    doc = {
      ...doc,
      _id: oldDoc._id,
      _rev: oldDoc._rev
    };
  } else {
    doc.createdOn = Date.now();
  }

  const { id, ok } = overrideId ? await db.put(doc) : await db.post(doc);
  if (!ok) new Error('Error updating doc');
  return { id, name };
}, SAVE_DOODLE, {
  onSuccess: ({ name }) => notificationActions.success({ position: 'tc', title: `successfully saved doodle: ${name}` }),
  onError: () => notificationActions.error({ position: 'tc', title: `failed to save doodle` })
});

export const LOAD_ALL = 'LOAD_ALL';
export const loadAll = createPromiseAction(async (dispatch, getState, options = {}) => {
  const { rows } = await db.query('sketches/name', options);
  return rows.map(({ doc }) => doc);
}, LOAD_ALL);

export const LOAD_ALL_NAMES = 'LOAD_ALL_NAMES';
export const loadAllNames = createPromiseAction(async () => {
  const { rows } = await db.query('sketches/name', { include_docs: true });
  return rows.map(({ doc }) => doc.name);
}, LOAD_ALL_NAMES);

export const LOAD_NUM_FILES = 'LOAD_NUM_FILES';
export const loadNumFiles = createPromiseAction(async () => {
  const { rows } = await db.query('sketches/name');
  return rows.length;
}, LOAD_NUM_FILES);

export const OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU';
export function openContextMenu(id) {
  return { type: OPEN_CONTEXT_MENU, id };
}

export const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';
export function closeContextMenu() {
  return { type: CLOSE_CONTEXT_MENU };
}
