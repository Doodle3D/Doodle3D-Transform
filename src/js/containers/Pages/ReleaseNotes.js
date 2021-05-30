import React from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/js/actions/index.js';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import injectSheet from 'react-jss';
import textMarkup from 'src/jss/textMarkup.js';
import { processContent } from 'src/js/utils/contentUtils.js';
import changelog from 'CHANGELOG.md';
// import createDebug from 'debug';
// const debug = createDebug('d3d:popup:ReleaseNotes');
import SignUpPay from 'src/js/components/SignUpPay.js';

const styles = {
  ...textMarkup,
  content: {
    gridColumn: '1 / 3'
  }
};

class ReleaseNotes extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  render() {
    const { classes, onClose } = this.props;
    const content = processContent(changelog || '');

    return (
      <SignUpPay onClose={onClose}>
        <div className={`${classes.text} ${classes.content}`}>
          <h2>Release notes</h2>
          <ReactMarkdown source={content} />
        </div>
      </SignUpPay>
    );
  }
}

export default connect(null, dispatch => ({
  onClose: () => dispatch(actions.router.push(`/`))
}))(injectSheet(styles)(ReleaseNotes));
