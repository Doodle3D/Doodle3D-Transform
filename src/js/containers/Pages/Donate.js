import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import textMarkup from 'src/jss/textMarkup.js';
import SignUpPay from 'src/js/components/SignUpPay.js';
import { connect } from 'react-redux';
import * as actions from 'src/js/actions/index.js';
import imgDonate from 'img/paypal-donate-button-doodle3d-QR-code.png'; 
import imgPayPal from 'img/btnPayPal.png'; 
import imgMollie from 'img/btnMollie.png';
import imgHeart from 'img/heart.jpg'; 

const styles = {
  ...textMarkup,

  floatRight: {
    float: "right",
    marginLeft: "20px"
  },

  floatLeft: {
    float: "left",
    marginRight: "20px"
  }
};

const Donate = ({ classes, onClose }) => (
  <SignUpPay onClose={onClose} medium >
    <div className={`${classes.text}`}>
      <h2>Love Doodle3D?</h2>
      <img src={imgHeart} width="200" className={classes.floatLeft}/>
      <a className={classes.floatRight} href="https://www.paypal.com/donate?hosted_button_id=EWJPZ9ZCJU4GE" target="_blank"><img src={imgDonate} height="150"/></a>
      <p>Do you also love Doodle3D Transform and want to help keeping it online?</p>
      <p>Your donation helps. Please click one of the buttons below or scan the QR-code.</p>
      <p>Thank you so much!</p>
      <br/>
      <div align="center">
      <a href="https://useplink.com/payment/FN2SAUblA50f1PlXG2W3w/" target="_blank"><img src={imgMollie} height="50" /></a>
      &nbsp;&nbsp;
      <a href="https://www.paypal.com/donate?hosted_button_id=EWJPZ9ZCJU4GE" target="_blank"><img src={imgPayPal} height="50"/></a>
      </div>
    </div>
  </SignUpPay>
);
Donate.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  onClose: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  onClose: () => dispatch(actions.router.push(`/`))
}))(injectSheet(styles)(Donate));
