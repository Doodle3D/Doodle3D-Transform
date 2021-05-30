import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
import App from './containers/App.js';
import MyDoodles from './containers/Pages/MyDoodles.js';
import Save from './containers/Pages/Save.js';
import About from './containers/Pages/About.js';
import Licenses from './containers/Pages/Licenses.js';
import Help from './containers/Pages/Help.js';
import Donate from './containers/Pages/Donate.js';
import Slicer from './containers/Pages/Slicer.js';
import ReleaseNotes from './containers/Pages/ReleaseNotes.js';
import AddImage from './containers/Pages/AddImage.js';
import * as envs from 'src/js/constants/envs.js';
import { browserHistory, hashHistory } from 'react-router';

export default () => (
  <Router history={envs.platform === 'ios-app' ? hashHistory : browserHistory}>
    <Route path="/" component={App}>
      <Route path="my-doodles" component={MyDoodles}/>
      <Route path="import" component={AddImage} />
      <Route path="save" component={Save} />
      <Route path="settings" component={About} />
      <Route path="licenses" component={Licenses} />
      <Route path="releasenotes" component={ReleaseNotes} />
      <Route path="help" component={Help} />
      <Route path="donate" component={Donate} />
      <Route path="slicer" component={Slicer} />
    </Route>
  </Router>
);
