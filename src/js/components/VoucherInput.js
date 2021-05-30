import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import injectSheet from 'react-jss';
// import createDebug from 'debug';
// const debug = createDebug('d3d:comp:voucherInput');

export const styles = {
  voucherButton: {
    margin: '0px 10px 10px 10px'
  },
  voucherInput: {
    width: '140px',
    top: '-28px'
  },
  voucherInputSection: {
    height: '52px',
    display: 'flex',
    alignItems: 'flex-start'
  }
};

const VoucherInput = (props) => {
  const { input, meta, onApply, validating, classes } = props;

  const onClick = () => onApply();

  return (
    <div className={classes.voucherInputSection}>
      <Field
        name="voucherCode"
        component={TextField}
        floatingLabelText="Apply coupon code"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        autoComplete="off"
        input={input}
        meta={meta}
        className={classes.voucherInput}
      />
      <RaisedButton
        label="Apply"
        primary
        onClick={onClick}
        disabled={meta.pristine || validating || meta.invalid || meta.submitting}
        className={classes.voucherButton}
      />
    </div>
  );
};
VoucherInput.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object,
  meta: PropTypes.object,
  validating: PropTypes.bool,
  onApply: PropTypes.func
};

export default injectSheet(styles)(VoucherInput);
