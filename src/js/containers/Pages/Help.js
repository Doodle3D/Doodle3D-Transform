import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import textMarkup from 'src/jss/textMarkup.js';
import SignUpPay from 'src/js/components/SignUpPay.js';
import { connect } from 'react-redux';
import * as actions from 'src/js/actions/index.js';

const VIDEO_SRC = 'https://www.youtube.com/embed/rkZNNzSJBps?modestbranding=1';

const styles = {
  ...textMarkup,
  content: {
    gridColumn: '1 / 3'
  }
};

const Help = ({ classes, onClose }) => (
  <SignUpPay onClose={onClose} medium >
    <div className={`${classes.text} ${classes.content}`}>
      <iframe
        width="840"
        height="410"
        src={VIDEO_SRC}
        frameBorder="0"
        allowFullScreen=""
      />
    </div>
  </SignUpPay>
);
Help.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  onClose: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  onClose: () => dispatch(actions.router.push(`/`))
}))(injectSheet(styles)(Help));
