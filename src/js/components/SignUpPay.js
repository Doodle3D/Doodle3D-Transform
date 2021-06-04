import * as actions from 'src/js/actions/index.js';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import injectSheet from 'react-jss';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { red500 } from 'material-ui/styles/colors';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '3fr 2fr'
  },
  header: {
    gridColumn: '1 / 3'
  }
};

const STEP = [
  'Create account',
  'Confirm your email',
  'Payment',
  'Enjoy!'
];

const SignUpPay = ({ classes, children, step, error, small, medium, onClose }) => (
  <div>
    <Dialog
      open
      modal={!onClose}
      autoScrollBodyContent
      contentStyle={{ ...(small ? { maxWidth: '460px' } : medium ? { maxWidth: '780px' } : { maxWidth: 'none', width: '92%' }) }}
      bodyStyle={{ paddingTop: '24px' }}
      actions={onClose}
       // && <FlatButton label="Close" onClick={onClose} />}
      onRequestClose={onClose}
    >
        {children}
    </Dialog>
  </div>
);
SignUpPay.defaultProps = {
  small: false
};
SignUpPay.propTypes = {
  small: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.sting,
  children: PropTypes.node,
};

export default connect(null, { })(injectSheet(styles)(SignUpPay));
