
import createDebug from 'debug';
const debug = createDebug('d3d:util:asyncActions');

const defaultSuffixes = ['PENDING', 'FULFILLED', 'REJECTED'];

/*
 * Some utils below are quite similar to the following util:
 * https://github.com/rjbma/redux-promise-reducer
 */

export function createPromiseActionCreators(
    instance,
    fnNames,
    promiseWrapper,
    actionPrefix = '',
    suffixes = defaultSuffixes
  ) {
  let actionCreators = {};
  for (const fnName of fnNames) {
    actionCreators = {
      ...actionCreators,
      ...createPromiseActionCreator(instance, fnName, promiseWrapper, actionPrefix, suffixes)
    };
  }
  return actionCreators;
}

/**
 * Creates an actionCreator that returns an
 * redux-promise-middleware compatible action with:
 * - type based on (prefix+) function name and
 * - the promise the function returns
 */
export function createPromiseActionCreator(
    instance,
    fnName,
    promiseWrapper,
    actionPrefix = '',
    suffixes = defaultSuffixes
  ) {
  const fn = instance[fnName];
  if (fn === undefined) {
    throw new Error(`Given instance doesn't have a function named '${fnName}'`);
  }
  actionPrefix = actionPrefix ? `${actionPrefix}_` : '';
  const fnNameUpper = fnName.toUpperCase();

  const pendingType = actionPrefix + fnNameUpper + '_' + suffixes[0];
  const fulfilledType = actionPrefix + fnNameUpper + '_' + suffixes[1];
  const rejectedType = actionPrefix + fnNameUpper + '_' + suffixes[2];

  return {
    [fnName]: function actionCreator() {
      debug('actionCreator called: ', fnName, arguments);
      const promise = fn.apply(instance, arguments);
      return {
        type: actionPrefix + fnNameUpper,
        payload: {
          promise: promiseWrapper ? promiseWrapper(promise, fnName, arguments) : promise,
          data: arguments // send as payload with pending action
        },
        // include arguments to meta so it's also included in
        // the fulfilled and rejected action types
        meta: {
          args: arguments
        }
      };
    },
    [pendingType]: pendingType,
    [fulfilledType]: fulfilledType,
    [rejectedType]: rejectedType
  };
}

/**
 * Creates a reducer that manages state for async actions
 */
export function createAsyncActionsReducer(pendingType, fulfilledType, rejectedType) {
  return function reducer(
      state = {
        pending: false,
        error: null,
        data: null
      },
      action
    ) {
    switch (action.type) {
      case pendingType:
        return {
          pending: true,
          data: null,
          error: null
        };
      case fulfilledType:
        return {
          pending: false,
          data: action.payload,
          error: null
        };
      case rejectedType:
        return {
          pending: false,
          data: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
}

/**
 * creates a reducers for a list of names
 * result is usable for combineReducers()
 */
export function createAsyncActionsReducers(
    prefix,
    names,
    // default suffixes from redux-promise-middleware:
    suffixes = defaultSuffixes
  ) {
  const reducers = {};
  prefix = prefix ? `${prefix}_` : '';

  for (const name of names) {
    const nameUpper = name.toUpperCase();
    const pendingType = prefix + nameUpper + '_' + suffixes[0];
    const fulfilledType = prefix + nameUpper + '_' + suffixes[1];
    const rejectedType = prefix + nameUpper + '_' + suffixes[2];
    reducers[name] = createAsyncActionsReducer(pendingType, fulfilledType, rejectedType);
  }
  return reducers;
}
