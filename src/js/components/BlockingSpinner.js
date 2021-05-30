import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 997
  }
};

const BlockingSpinner = ({ classes, active }) => (active ? (
  <div className={classes.container}>
    <CircularProgress size={60} thickness={5} color="white"/>
  </div>
) : null);
BlockingSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired
};

export default connect(state => ({
  active: state.blockingSpinner.active
}))(injectSheet(styles)(BlockingSpinner));
