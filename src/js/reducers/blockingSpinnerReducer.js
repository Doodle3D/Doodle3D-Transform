import * as actions from 'src/js/actions/blockingSpinner.js';

const initialState = {
  active: false
};

export default function blockingSpinnerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START:
      return {
        ...state,
        active: true
      };
    case actions.STOP:
      return {
        ...state,
        active: false
      };
    default:
      return state;
  }
}
