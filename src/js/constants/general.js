import * as envs from 'src/js/constants/envs.js';
import bowser from 'bowser';

export const CLICK_TIME_THRESHOLD = 300;
export const DOUBLE_CLICK_TIME_THRESHOLD = 300;
export const MAX_CLICK_MOVE_THRESHOLD = 10;
// On android and iOS autofocus means the keyboard pops up for one second and then hides
// Disable autofocus on these devices
export const AUTO_FOCUS_TEXT_FIELDS = !(bowser.mobile || bowser.tablet);
export const REQUEST_CONFIG = {
  LARGE: { timeout: 0 }
};
