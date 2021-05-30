export default function createRapidActionFilter(threshold) {
  // ignore rapid action types that are the same
  let ignoreRapid = false;
  let prevActionType;
  return function rapidActionFilter(action) {
    if (action.type !== prevActionType) {
      ignoreRapid = false;
      prevActionType = action.type;
      return true;
    }
    if (ignoreRapid) {
      return false;
    }
    ignoreRapid = true;
    setTimeout(() => {
      ignoreRapid = false;
    }, threshold);
    return true;
  };
}
