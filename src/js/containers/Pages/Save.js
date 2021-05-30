import React from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/js/actions/index.js';
import { connect } from 'react-redux';
import { currentFileName } from 'src/js/reducers/index.js';
import textMarkup from 'src/jss/textMarkup.js';
import injectSheet from 'react-jss';
import { reduxForm, Field, startSubmit, formValueSelector } from 'redux-form';
import { formPromiseWrapper } from 'src/js/utils/formUtils.js';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { AUTO_FOCUS_TEXT_FIELDS } from 'src/js/constants/general.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// import createDebug from 'debug';
// const debug = createDebug('d3d:popup:save');

const style = {
  ...textMarkup
};

const onSubmit = async (values, dispatch, props) => {
  await formPromiseWrapper(props.save(values.fileName));
  props.onClose();
};


class Save extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    save: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    downloadCurrentSketch: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.object,
    onClose: PropTypes.func.isRequired
  };
  render() {
    const { classes, handleSubmit, submitting, invalid, error, onClose, submit, save, downloadCurrentSketch, fileName } = this.props;

    return (
      <Dialog
        open
        contentStyle={{ maxWidth: '460px' }}
        actions={[
          <FlatButton label="Close" onClick={onClose} />,
          <FlatButton label="Download file" onClick={() => downloadCurrentSketch(fileName)} />,
          <RaisedButton label="Save in browser" onClick={handleSubmit} primary disabled={ submitting || invalid } />
        ]}
        onRequestClose={onClose}
      >
        <div>
          <h2>Save</h2>
          <p>Your doodle will be saved in the <u>local storage of your web browser</u>.
          Make sure to make a <a>backup (see export menu)</a> of your doodles every once in a while.</p>
          {error && <p className={classes.error}>error</p>}
          <form onSubmit={handleSubmit}>
            <Field
              autoFocus={AUTO_FOCUS_TEXT_FIELDS}
              name="fileName"
              component={TextField}
              floatingLabelText="File name"
              fullWidth
            />
          </form>
        </div>
      </Dialog>
    );
  }
}

const formName = 'save';

const selector = formValueSelector(formName);

export default connect(state => ({
  fileName: selector(state, "fileName"),
  initialValues: { fileName: currentFileName(state) || '' }
}), (dispatch) => ({
  downloadCurrentSketch: (fileName) => dispatch(actions.files.downloadCurrentSketch(fileName)),
  submit: () => dispatch(startSubmit(formName)),
  save: (fileName) => dispatch(actions.files.saveFile(fileName)),
  onClose: () => dispatch(actions.router.push('/'))
}))(reduxForm({
  form: formName,
  onSubmit
})(injectSheet(style)(Save)));
