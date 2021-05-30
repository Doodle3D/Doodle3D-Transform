import 'core-js/fn/promise'; // IE 11 support
import Spinner from 'spin.js';
const target = document.getElementById('app');
const preloader = new Spinner().spin(target);

import(/* webpackChunkName: "main" */ './index.js').then(() => {
  preloader.stop();
});
