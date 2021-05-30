import update from 'react-addons-update';
import * as actions from 'src/js/actions/index.js';
import * as sketcher from '@doodle3d/doodle3d-core/lib/actions';
import { createPromiseReducer, initialState as initialPromiseState } from 'redux-promise-action';

const SKETCHER_ACTIONS = Object.keys(sketcher);
export const initialState = {
  name: null,
  id: null,
  unSavedData: false,
  gallery: initialPromiseState,
  activeContextMenu: null,
};

const galleryReducer = createPromiseReducer(actions.files.LOAD_GALLERY);

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.sketcher.CLEAR: {
      return update(state, {
        name: { $set: null },
        id: { $set: null },
        unSavedData: { $set: false },
      });
    }

    case actions.files.OPEN_FILE: {
      const { name, id } = action;
      return update(state, {
        name: { $set: action.name },
        id: { $set: action.id },
        unSavedData: { $set: false },
      });
    }

    case `${actions.files.SAVE_DOODLE}_FULFILLED`: {
      return update(state, {
        name: { $set: action.payload.name },
        id: { $set: action.payload.id },
        unSavedData: { $set: false },
      });
    }

    case `${actions.files.REMOVE_DOODLE}_FULFILLED`:
      if (action.payload._id === state.id) {
        return update(state, {
          id: { $set: null },
          unSavedData: { $set: false },
        });
      }
      return state;

    case actions.files.OPEN_CONTEXT_MENU:
      return update(state, { activeContextMenu: { $set: action.id } });
    case actions.files.CLOSE_CONTEXT_MENU:
      return update(state, { activeContextMenu: { $set: null } });

    default:
      if (SKETCHER_ACTIONS.includes(action.type)) {
        return update(state, {
          unSavedData: { $set: true }
        });
      }

      return update(state, {
        gallery: { $set: galleryReducer(state.gallery, action) }
      });
  }
  return state;
};

export function currentName(state) {
  return state.name;
}
