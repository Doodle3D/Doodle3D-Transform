export default function debugOverlappingDispatches() {
  let isDispatching = false;
  let dispatchingAction;
  return function middleware() {
    return next => action => {
      if (isDispatching) {
        console.log(`Overlapping dispatch: ${action.type} during ${dispatchingAction.type}`);
      }
      isDispatching = true;
      dispatchingAction = action;
      next(action);
      isDispatching = false;
      dispatchingAction = null;
    };
  };
}
