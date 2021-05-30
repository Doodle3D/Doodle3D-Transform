import * as actions from './index.js';
import bowser from 'bowser';
import keycode from 'keycode';
// import createDebug from 'debug';
// const debug = createDebug('d3d:actions:hotkeys');

export const keyPress = (event, pathname) => {
  return (dispatch) => {
    const { metaKey, ctrlKey } = event;
    const key = keycode(event);

    const commandKey = bowser.mac ? metaKey : ctrlKey;

    // ignore key events from input fields by checking event target
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    const targetTag = event.target.tagName.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea') return;

    if (pathname === '/') {
      switch (key) {
        case 's':
          if (commandKey) {
            event.preventDefault(); // pevent default browser saving behaviour
            dispatch(actions.router.push('/save'));
          }
          break;

        case 'o':
          if (commandKey) {
            event.preventDefault(); // pevent default browser opening behaviour
            dispatch(actions.router.push('/my-doodles'));
          }
          break;

        default:
          break;
      }
    }
  };
};
