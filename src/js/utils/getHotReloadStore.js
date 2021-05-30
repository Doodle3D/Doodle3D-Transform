/**
 * Utility to store data over hot reloads.
 */

const globalStore = {};
export default function getHotReloadStore(key) {
  if (globalStore[key] === undefined) {
    globalStore[key] = {};
  }
  return globalStore[key];
}
