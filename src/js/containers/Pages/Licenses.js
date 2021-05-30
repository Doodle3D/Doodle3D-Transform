import React from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/js/actions/index.js';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import textMarkup from 'src/jss/textMarkup.js';
import dependencies from 'data/licenses.json';
import _ from 'lodash';
import SignUpPay from 'src/js/components/SignUpPay.js';
// import createDebug from 'debug';
// const debug = createDebug('d3d:popup:licenses');

const styles = {
  content: {
    gridColumn: '1 / 3'
  },
  ...textMarkup
};

class Licenses extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  render() {
    const { classes, onClose } = this.props;

    let licenses = dependencies.map(dep => dep.licenses);
    licenses = _.flatten(licenses); // some packages contain an array with multiple licenses
    licenses = licenses.map(license => license.replace(/\*$/, '')); // remove * from licenses, see footnote
    const uniqLicenses = _.uniq(licenses);

    return (
      <SignUpPay onClose={onClose}>
        <div className={`${classes.text} ${classes.content}`}>
          <h2>Licenses Doodle3D</h2>
          <table>
            <tbody>
            {dependencies.map(dependency => (
              <tr key={dependency.name}>
                <td><a href={dependency.url}>{dependency.name}</a></td>
                <td className={classes.publisher}>{dependency.publisher || ''}</td>
                <td>{dependency.licenses}</td>
              </tr>
            ))}
            </tbody>
          </table>
          <p>
          * License was deduced from an other file than package.json (README, LICENSE, COPYING, ...)
          </p>
          <p>Unique licenses found:</p>
          <ul>
            {uniqLicenses.map(license => <li>{license}</li>)}
          </ul>
        </div>
      </SignUpPay>
    );
  }
}

export default connect(null, dispatch => ({
  onClose: () => dispatch(actions.router.push(`/`))
}))(injectSheet(styles)(Licenses));
