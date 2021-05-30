import createDebug from 'debug';
// const debug = createDebug('d3d:util:util');

export function getDiff(a, b, path = '/', result = '') {
  if (a !== b) {
    if (path.length === 1) {
      result += 'diff:';
    }
    result += `\n  ${path}: ${a}, ${b}`;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const allKeys = uniq(Object.keys(a).concat(Object.keys(b)));
    for (let key of allKeys) {
      const seperator = (path.length > 1) ? '.' : '';
      const subPath = `${path}${seperator}${key}`;
      result += getDiff(a[key], b[key], subPath);
    }
  }
  return result;
}

function uniq(array) {
  const seen = {};
  const out = [];
  const len = array.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = array[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

export function loggedReducer(reducer) {
  const reducerDebug = createDebug(`d3d:reducer:${reducer.name}:`);
  return (state, action) => {
    if (action.log !== false && action.type) reducerDebug(action.type);
    return logResult(reducerDebug, '  newState: ', reducer(state, action));
  };
}

export function logResult(debugInstance, text, value) {
  debugInstance(text, value);
  return value;
}

export function createQuery(properties, joinString = '&', identifierString = '=') {
  return Object.entries(properties)
    .map(([key, value]) => `${key}${identifierString}${String(value)}`)
    .join(joinString);
}

export function extractQuery(queryString, joinString = '&', identifierString = '=') {
  return queryString.split('?')[1].split(joinString)
    .map(entry => entry.split(identifierString))
    .reduce((query, [key, value]) => {
      query[key] = decodeURIComponent(value);
      return query;
    }, {});
}

export const isValidNumber = (num) => typeof num === 'number' && !isNaN(num);

// remove inline authentication from url
export function removeAuthFromURL(url) {
  return url.replace(/(https?:\/\/)[^@]*@/, '$1');
}

export function getErrorMessage(err) {
  if (typeof err.reason === 'string') {
    return err.reason;
  } else {
    const { error, message } = err.reason;
    const parts = [];
    if (error) parts.push(error);
    if (message) parts.push(message);
    return parts.join(': ');
  }
}

export function forceResize() {
  requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
}
