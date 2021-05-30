// import createDebug from 'debug';
// const debug = createDebug('d3d:service:localStore');

const NAME = 'doodle3d';

export function read() {
  try {
    const raw = localStorage.getItem(NAME);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.error('Reading localStorage failed, falling back to default'); // eslint-disable-line no-console
  }
  return null;
}
export function write(newData) {
  // debug('write: ', newData);
  try {
    localStorage.setItem(NAME, JSON.stringify(newData));
  } catch (error) {
    console.error('Storing data to localStorage failed'); // eslint-disable-line no-console
  }
  return newData;
}

// Middleware
// Make a subsection of the state persistant
// Will start writing to storage after a initializingAction
export function makePersistantMiddleware(selector, initializingAction) {
  let prevState;
  let initialized = false;
  return store => next => action => {
    let result = next(action);
    // retrieve state to persist using selector
    const state = selector(store.getState());
    if (state !== prevState) { // if subsection changed
      if (initialized) write(state); // store state
      prevState = state;
    }
    if (action.type && action.type === initializingAction) {
      initialized = true;
    }
    return result;
  };
}
